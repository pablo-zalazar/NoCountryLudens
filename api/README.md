<h1 align = "center"> LUDENS </h1>
<p align = "center"> <img src = "https://res.cloudinary.com/ddg3a37dp/image/upload/v1670579410/llogo_gd6skt.gif" /></p>
<p align = "center"> Ludens es un sitio web de juegos educativos para niños. En nuestra palataforma aprendes jugando con tus amigos con un sistema de mensajes predefinido, apostando por la seguridad. Desafía a tus amigos, comparte tu ranking, agrega a favoritos y mucho mas.</p>


<br/>

## Desarrollada con: 🛠️

<br/>

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![REACT](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![BOOTSTRAP](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![REDUX](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![ESLINT](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![PRETTIER](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![CLOUDINARY](https://img.shields.io/badge/Cloudinary-100000?style=for-the-badge&logo=Cloudinary&logoColor=7DDAF4&labelColor=black&color=black)
![PusherChannerls](https://img.shields.io/badge/PusherChannels-100000?style=for-the-badge&logo=Pusher&logoColor=7DDAF4&labelColor=black&color=black)
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
<br/>
<br/>

## Requerimientos 📋

Se necesita tener instalado NODEJS y NPM.
El backend corre en NODEJS 14
<br/><br/><br/>

### SITIO WEB 

<br/>

***Dependencias:*** 

emotion/react:^11.10.5 ,emotion/styled: 11.10.5, mui/material:^5.10.14,reduxjs/toolkit:^1.9.0,axios: ^1.1.3,bootstrap-icons: ^1.10.2,emoji-picker-react: ^4.4.6,formik: ^2.2.9,keen-slider: ^6.8.3, prop-types: ^15.8.1, react: ^18.2.0, react-dom: ^18.2.0, react-jigsaw-puzzle: ^1.0.4, react-redux: ^8.0.5, react-responsive: ^9.0.2, react-router-dom: ^6.4.3, react-toastify: 9.1.1, sass: ^1.56.1, socket.io-client: ^4.5.4, sweetalert2: ^11.4.8, yup: ^0.32.11

***Instrucciones:***

- Ir a la carpeta Frontend.
- Instalar dependencias con ```npm i```
- Crear un archivo .env en la carpeta front con la variable VITE_API_URL conteniendo la información de la URL de la API
- En la consola ingresar ``` npm run dev```, o ```npm start```
- Acceder al puerto 5173 de localhost.


### API


***Documentación: ***

[Api Documentación Aquí](https://docs.google.com/document/d/1l0BrUa3j5a0D44qTp73qbrOP9SrjIC4r4CxgGI82Vnc/edit#heading=h.ctjmeoh2jl80)
<br/>

***Instrucciones:***

  - Instalar dependencias con ```npm i```

  - Crear una cuenta en cloudinary y obtener el cloud_name, cloud_api y cloud_api_secret de la cuenta.

  - Crear un archivo .env con las siguientes variables:

  ```MONGO_URI="nombre de la base de datos mongoDB"
  PORT="8000"
  JWT_SECRET= el secret elegido para el token.
  CLOUD_NAME= cloud name de la cuenta de cloudinary.
  CLOUD_API_KEY= api key de la cuenta de cloudinary.
  CLOUD_API_SECRET= api secret de la cuenta de cloudinary.
  ORIGINS_ALLOWED= Las webs desde donde haremos las llamadas a la api.
  (Ej: "http://localhost:5173/, http://127.0.0.1:5173, http://localhost:5173,http://localhost:5174/, http://127.0.0.1:5174,   http://localhost:5174")
  ```
  
  - Correr el servidor con ```npm run dev``` o ```npm start```
<br/>
<br/>


## Diseño

Puedes encontrar el diseño completo de esta web [AQUI](https://www.figma.com/file/Y8CsQ39oL4ZzU4uoH6h9CQ/Ludens-No-Country---S5-14?node-id=33%3A962&t=IBCBgGb4d4yUs1Ev-0)
Puedes encontrar el PROTOTIPO del diseño de esta web en [AQUI](https://www.figma.com/proto/Y8CsQ39oL4ZzU4uoH6h9CQ/Ludens-No-Country---S5-14?node-id=1029%3A10568&scaling=min-zoom&page-id=33%3A962&starting-point-node-id=1029%3A10568&show-proto-sidebar=1)
Puedes encontrar vídeos sobre la aplicación:
</br>
[Vídeo promocional](https://youtu.be/uQSSKS88s94) 
</br>
[Vídeo con todas las funcionalidades](https://youtu.be/tak2Cooawf4)

## Deploy 📋


Puedes encontrar nuestra API en el siguiente link: [https://ludensapi.vercel.app](https://ludensapi.vercel.app)
<br/><br/>
Puedes encontrar nuestra WEB en el siguiente link: [https://ludens-two.vercel.app](https://ludens-two.vercel.app)

<br/><br/>


# Equipo

</br>

## Team Leader 🚀

### Hernan Emanuel Reyes 

</br>

## UX

### Kevin Grassi 

### Christian Sotelo

</br>

## Front - End 🚀

### Maria Bracho Villanueva 

### Emanuel Capo 

### Juan Carracedo 

### Jhonatan Poblet

<br/>

## FullStack 🚀

### Javier Moron: [Linkedin](https://www.linkedin.com/in/javier-alberto-moron-de-oliveira-a7504218a/) | [GitHub](https://github.com/requin883)

### Maria Villen [Linkedin](https://www.linkedin.com/in/maria-villen/) | [GitHub](https://github.com/MariaVillen)

### Pablo Zalazar [Linkedin](https://www.linkedin.com/in/pablozalazar/) | [GitHub](https://github.com/pablo-zalazar)
