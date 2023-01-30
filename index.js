import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import url from 'url';

const app = express();
const port = 3000;

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(express.static(path.join(__dirname, 'static')));
app.use(fileUpload());

app.post('/post', (request, response) => {
  const file = request.files.file;
  const target = path.join(__dirname, 'uploads', file.name);
  file.mv(target, err => {
    if (err) {
      response.send(err.toString());
    } else {
      response.send('Done.');
    }
  });
});

app.listen(port, () => {
  console.log(`uploader listening on port ${port}`);
});
