const express = require('express');
const fileupload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();
app.use(fileupload({
    createParentPath: true
}));

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

const port = 3000;

app.post('/upload', async (req, res) => {
    try{
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded...'
            })
        } else if (req.body === {}) {
            res.send({
                status: false,
                message: 'Empry object uploaded...'
            })
        } else {
            let avatar = req.files.avatar;
            avatar.mv('./uploads/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'file uploaded successfully...',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    }catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});

