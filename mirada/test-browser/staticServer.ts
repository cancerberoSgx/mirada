import { createReadStream } from "fs"
import { createServer, IncomingMessage, Server, ServerResponse } from "http"
import { join } from 'path'
import { Fn } from 'misc-utils-of-mine-generic';

export function staticServer(basePath: string, port = 9999, onFound:Fn=()=>{}, onNotFound:Fn=()=>{}): Promise<Server>  {
  return new Promise(async (resolve) => {
    const server =  createServer((req, res) => {
      var url = resolveUrl(req.url);
      onFound && onFound(url);
      var stream =  createReadStream(join(basePath, url || ''));
      stream.on('error', function () {
        onNotFound && onNotFound(url);
        res.writeHead(404);
        res.end();
      });
      stream.pipe(res);
    }).listen(port);
    server.on('listening', () => {
      resolve(server);
    });
  });
  function resolveUrl(url = '') {
    var i = url.indexOf('?');
    if (i != -1) {
      url = url.substr(0, i);
    }
    i = url.indexOf('#');
    if (i != -1) {
      url = url.substr(0, i);
    }
    return url;
  }
}


// export async function staticServer(basePath: string, port = 9999): Promise<Server> {
//   const server = await createServer((req: IncomingMessage, res: ServerResponse) => {
//     var url = resolveUrl(req.url)
//     var stream = createReadStream(join(basePath, url || ''))
//     stream.on('error', function() {
//       res.writeHead(404)
//       res.end()
//     })
//     stream.pipe(res)
//   }).listen(port)
//   return new Promise(async (resolve) => {
//     await server
//     server.on('listening', () => {
//       resolve(server)
//     })
//   })
// }

// function resolveUrl(url = '') {
//   var i = url.indexOf('?')
//   if (i != -1) {
//     url = url.substr(0, i)
//   }
//   i = url.indexOf('#')
//   if (i != -1) {
//     url = url.substr(0, i)
//   }
//   return url
// }
