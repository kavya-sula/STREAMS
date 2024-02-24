// / console.time("writeMany");
// let a=2+2;
// console.timeEnd("writeMany");


// const fs=require("node:fs/promises");
// (async () => {
//         console.time("writeMany");
//         const fileHandle = await fs.open("test.txt","w");

//         for(let i=0;i<10000;i++){
//             await fileHandle.write(` ${i}`);
//         }
//         console.timeEnd("writeMany");
// })();



// const fs=require("node:fs");
// (async () => {

//    console.time("writeMany");
//    fs.open("test.txt", "w", (err, fd) => {
//        for(let i=0;i<1000000;i++){
//           fs.write(fd, `${i} `,()=>{});
//       }
//           console.timeEnd("writeMany");

//     });
//  })();



// Execution Time: 270ms
// CPU Usage: 100% (one core)
//Memory Usage:
// const fs = require("node:fs/promises");
// (async () => {
// console.time("writeMany");
// const fileHandle = await fs.open("test.txt", "w");
// const stream = fileHandle.createWriteStream();
// for (let i = 0; i < 1000000; i++) {

// const buff = Buffer.from(` ${i}`,"utf-8");

// stream.write(buff);
// }
// console.timeEnd("writeMany");

// })();


// WRITEABLE STREAM
const fs = require("node:fs/promises");

(async () => {
    console.time("writeMany");
    const fileHandle = await fs.open("test.txt", "w");

    const stream=fileHandle.createWriteStream();

    console.log(stream.writableHighWaterMark);

//     const buff=Buffer.alloc(16383, 10);

//     console.log(buff);
//    console.log( stream.write(buff));
//    console.log( stream.write(Buffer.alloc(1, "a")));
//    console.log( stream.write(Buffer.alloc(1, "a")));
//    console.log( stream.write(Buffer.alloc(1, "a")));


//    console.log(stream.writableLength);
//    stream.on("drain", ()=>{
//     console.log( stream.write(Buffer.alloc(16383, "a")));
//     console.log(stream.writableLength);

//     console.log("now we are safe to write more")
//    });

    // setInterval( () => {}, 100);

    let i=0;
const numberOfWrites=10000
    const writeMany =() => {
    while(i<numberOfWrites){
        const buff=Buffer.from(` ${i} `,"utf-8");
        if(i===numberOfWrites-1){
            return stream.end(buff)
            // stream.write("data");

        }

        if(!stream.write(buff)) break;

    // console.log(stream.writableBuffer);

    // console.log(stream.writableHighWaterMark);

    stream.write(buff);
    i++;
    }
    };

    writeMany();
    stream.on("drain", () => {
        console.log("draining!!!");
        writeMany();
    });
    stream.on("finish", () => {
        console.timeEnd("writeMany");
        fileHandle.close();


    })
    // const buffs=Buffer.from("Sunny");

    // stream.write(buffs);
    // stream.write(buffs);
    // stream.write(buffs);

    // console.log(buffs);

    // console.log(stream.writableLength);


    // console.timeEnd("writemany");
    // fileHandle.close();

})();





