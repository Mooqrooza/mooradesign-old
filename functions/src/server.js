const fs = require('fs');
const cors = require('cors');
const express =  require("express");
const app = express();
/* Projects json file source */
const projects = require('./lib/projects/projects.json');

/* App settings */
app.use(cors());

/* Request projects main info */
app.get('/projects', (req, res) => {
  res.json(projects);
});

/* Request  project images */
app.get('/project-images/:id', (req, res) => {
  const id = req.params.id ? req.params.id : 1;
  const filesFolderPath = './src/lib/projects/images/'+id+'/';
  /* <<< getImagesArr */
  const getImagesArr = async () => {
    return new Promise((resolve, reject) => {
      fs.readdir(filesFolderPath, async (err, imgFilesNames) => {
        if (err) throw new Error(`Unable to load project images! ${err}`);
        const loadAllImges = imgFilesNames.map(item => {
          return fs.readFileSync(filesFolderPath+item, 'base64', (err, imgFile) => {
            if (err) throw new Error(`Unable to load project images! ${err}`);
            return resolve(imgFile);
          });
        });
        const imagesArr = await Promise.all(loadAllImges);
        return resolve(imagesArr);
      });
    });
  };
  /* getImagesArr >>> */
  getImagesArr().then(imagesArr => res.json(imagesArr)).catch(err => res.send(err));
});

/* Request background audio. Use random audio file from list. */
app.get('/sound', (req, res) => {
  const filesFolderPath = './src/lib/sound/';
  /* <<< getSoundPath */
  const getSoundPath = async () => {
    return new Promise((resolve, reject) => {
      fs.readdir( filesFolderPath, async (err, soundFilesNames ) => {
        if (err) throw new Error(`Unable to load sound! ${err}`);
        const filePath = filesFolderPath + '/bg-sound-1.mp3';
        fs.readFile(filePath, 'base64', (err, soundFile) => {
          if (err) throw new Error(`Unable to load sound! ${err}`);
          resolve(soundFile);
        });
      });
    });
  };
  /* getSoundPath >>> */
  getSoundPath().then(soundFile => res.json(soundFile))
   .catch((err) => res.send(err));
});

module.exports = app;
