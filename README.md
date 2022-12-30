## PRUEBAS PACKAGE.JSON

<div align="center" valign="top"><br>
<img align="center" alt="Js" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg">
<img align="center" alt="nodejs" height="30" width="40" src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg">
<img align="center" alt="Wa-Jest" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg">
<img align="center" alt="Mongo" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg">
<img align="center" alt="git" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg">
<img align="center" alt="postman" height="30" width="30" src="https://camo.githubusercontent.com/93b32389bf746009ca2370de7fe06c3b5146f4c99d99df65994f9ced0ba41685/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f676574706f73746d616e2f676574706f73746d616e2d69636f6e2e737667">
<img align="center" alt="express" height="30" width="30" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg">    
</div><br>

## ENDPOINTS

| /songs                                | /users                      |
| ------------------------------------- | --------------------------- |
| [GET] "/" ✔✅                         | [POST] "/register" ✔✅      |
| [GET] "/:id" ✔✅                      | [POST] "/login" ✔✅         |
| [GET] "/:genre" ✔✅                   | [PATCH]"/addfav/:id" ✔✅    |
| [POST]"/" (Artist) ✔✅                | [PATCH]"/deleteFav/:id" ✔✅ |
| [DELETE]"/:id" (Artist) ❌            | [DELETE]"/" ✔✅             |
| [PATCH]"/updateSong/:id" (artist) ✔✅ |                             |

[POST]"/" (Artist) ✔✅ - Recoge tb la informacion del artista que la ha creado.

## MODELO DE DATOS

```
User:
    id: ObjectId;
    name: string;
    email: string;
    passwd: string;
    role: "Artist" | "Consumer";
    favoriteSongs: Array<ObjectId>;
    mySongs: Array<Songs>
    playlist?: Array<Playlist>;


Playlist
    namePlaylist: string
    genero: string
    songs: Array<Songs>
    owner: ObjectId


Songs
    id: ObjectId
    name: string
    url: string
    image: string
    genero: "Rock" | "Pop" | "Rap"
    artist: User

```
