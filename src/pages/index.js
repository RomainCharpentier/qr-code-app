import * as React from 'react';
import QRCode from 'qrcode';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import jsQR from 'jsqr';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// styles
const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: '#663399',
}
const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: '#8A6534',
  padding: 4,
  backgroundColor: '#FFF4DB',
  fontSize: '1.25rem',
  borderRadius: 4,
}

const linkStyle = {
  color: '#8954A8',
  fontWeight: 'bold',
  fontSize: 16,
  verticalAlign: '5%',
}

const useStyles = makeStyles((theme) =>
  createStyles({
    input: {
      margin: theme.spacing(1),
      height: 38
    },
    image: {
      height: '300px',
      width: '300px',
      border: '5px solid #663399',
      marginBottom: theme.spacing(1)
    }
  })
);

// markup
const IndexPage = () => {
  const classes = useStyles();
  const [qrImage, setQrImage] = React.useState('');
  const [qrText, setQrText] = React.useState('');

  const jsQR_fromBase64 = (base64) => {
    return new Promise((resolve, reject) => {
      const image = document.createElement('img');
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        try {
          const imageData = context.getImageData(0, 0, image.width, image.height);

          const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
          resolve(qrCode);
        } catch (e) {
          reject(e);
        }
      };
      image.src = base64;
    });
  }

  const handleClick = () => {
    QRCode.toDataURL(qrText)
      .then(url => {
        setQrImage(url);
      })
      .catch(err => {
        console.error(err)
      })
  }
  if (qrImage != '') {
    console.log(qrImage);
    const code = jsQR_fromBase64(qrImage).then(data => console.log(data));
  }
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1 style={headingStyles}>
        Generate your
        <br />
        <span style={headingAccentStyles}>QR Code</span>
      </h1>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Grid item>
          <img src={qrImage} className={classes.image} />
        </Grid>
        <Grid item>
          <TextField
            InputProps={{
              className: classes.input
            }}
            label='qrText'
            value={qrText}
            onChange={(e) => setQrText(e.target.value)}
            variant='outlined'
          />
          <Button variant='contained' color='primary' onClick={handleClick} className={classes.input}>
            Générer
          </Button>
        </Grid>
      </Grid>
    </main>
  )
}

export default IndexPage
