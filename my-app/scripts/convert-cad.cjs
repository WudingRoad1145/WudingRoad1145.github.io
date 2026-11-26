// Offline STEP -> glTF preview. The original engineering file stays local.
// Usage: node scripts/convert-cad.cjs input.step public/babymilu/cad/part.glb
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const [input, output] = process.argv.slice(2);
if (!input || !output)
  throw new Error("Provide an input STEP file and output GLB path.");

require("occt-import-js")()
  .then((occt) => {
    const source = fs.readFileSync(input);
    const result = occt.ReadStepFile(source, {
      linearUnit: "millimeter",
      linearDeflectionType: "absolute_value",
      linearDeflection: 0.03,
      angularDeflection: 0.18,
    });
    if (!result.success || !result.meshes.length)
      throw new Error("CAD import failed.");
    const min = [Infinity, Infinity, Infinity],
      max = [-Infinity, -Infinity, -Infinity];
    for (const mesh of result.meshes) {
      mesh.attributes.position.array.forEach((v, i) => {
        min[i % 3] = Math.min(min[i % 3], v);
        max[i % 3] = Math.max(max[i % 3], v);
      });
    }
    const center = min.map((v, i) => (v + max[i]) / 2);
    const gltf = {
      asset: {
        version: "2.0",
        generator: "BabyMilu CAD preview / occt-import-js",
      },
      scene: 0,
      scenes: [{ nodes: [] }],
      nodes: [],
      meshes: [],
      materials: [
        {
          name: "Neutral preview finish",
          pbrMetallicRoughness: {
            baseColorFactor: [0.45, 0.43, 0.41, 1],
            metallicFactor: 0,
            roughnessFactor: 0.65,
          },
          doubleSided: true,
        },
      ],
      buffers: [],
      bufferViews: [],
      accessors: [],
    };
    const chunks = [];
    let bytes = 0;
    function accessor(array, componentType, type, bounds) {
      const data = Buffer.from(
        array.buffer,
        array.byteOffset,
        array.byteLength,
      );
      const view = gltf.bufferViews.length;
      gltf.bufferViews.push({
        buffer: 0,
        byteOffset: bytes,
        byteLength: data.length,
      });
      chunks.push(data);
      bytes += data.length;
      const id = gltf.accessors.length;
      gltf.accessors.push({
        bufferView: view,
        componentType,
        count: array.length / (type === "VEC3" ? 3 : 1),
        type,
        ...bounds,
      });
      return id;
    }
    let triangles = 0;
    for (const mesh of result.meshes) {
      const raw = mesh.attributes.position.array;
      const positions = new Float32Array(raw.length);
      const normals = new Float32Array(raw.length);
      const lo = [Infinity, Infinity, Infinity],
        hi = [-Infinity, -Infinity, -Infinity];
      for (let i = 0; i < raw.length; i += 3) {
        // STEP millimetres / Z-up -> glTF metres / Y-up; preserve relative placement.
        positions[i] = (raw[i] - center[0]) / 1000;
        positions[i + 1] = (raw[i + 2] - center[2]) / 1000;
        positions[i + 2] = -(raw[i + 1] - center[1]) / 1000;
        const n = mesh.attributes.normal.array;
        normals[i] = n[i];
        normals[i + 1] = n[i + 2];
        normals[i + 2] = -n[i + 1];
        for (let axis = 0; axis < 3; axis++) {
          lo[axis] = Math.min(lo[axis], positions[i + axis]);
          hi[axis] = Math.max(hi[axis], positions[i + axis]);
        }
      }
      const attributes = {
        POSITION: accessor(positions, 5126, "VEC3", { min: lo, max: hi }),
        NORMAL: accessor(normals, 5126, "VEC3"),
      };
      const indices = accessor(
        new Uint32Array(mesh.index.array),
        5125,
        "SCALAR",
      );
      triangles += mesh.index.array.length / 3;
      gltf.scenes[0].nodes.push(gltf.nodes.length);
      gltf.nodes.push({
        name: `Part ${gltf.nodes.length + 1}`,
        mesh: gltf.meshes.length,
      });
      gltf.meshes.push({ primitives: [{ attributes, indices, material: 0 }] });
    }
    gltf.buffers.push({ byteLength: bytes });
    let json = Buffer.from(JSON.stringify(gltf));
    json = Buffer.concat([
      json,
      Buffer.alloc((4 - (json.length % 4)) % 4, 0x20),
    ]);
    const bin = Buffer.concat(chunks);
    const header = Buffer.alloc(12);
    header.write("glTF");
    header.writeUInt32LE(2, 4);
    header.writeUInt32LE(28 + json.length + bin.length, 8);
    const jh = Buffer.alloc(8);
    jh.writeUInt32LE(json.length);
    jh.write("JSON", 4);
    const bh = Buffer.alloc(8);
    bh.writeUInt32LE(bin.length);
    bh.writeUInt32LE(0x004e4942, 4);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, Buffer.concat([header, jh, json, bh, bin]));
    console.log(
      JSON.stringify(
        {
          output,
          parts: result.meshes.length,
          triangles,
          bytes: fs.statSync(output).size,
          sourceSha256: crypto
            .createHash("sha256")
            .update(source)
            .digest("hex"),
          boundsMillimeters: { min, max },
        },
        null,
        2,
      ),
    );
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
