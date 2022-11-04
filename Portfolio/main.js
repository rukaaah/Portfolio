import './style.css'
import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from 'three';
import { DoubleSide, LuminanceAlphaFormat, RGB_ETC1_Format, TorusGeometry, Vector3 } from 'three';
// ! ARRUMAR O ZOOM DA PAGE



function celular() { 
  if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
     return true;
   }
  else {
     return false;
   }
 }
 const bloqueio = document.getElementById("block");

if (celular()){
  bloqueio.style.display = "block"
}else{
  bloqueio.style.display = "none"

THREE.DefaultLoadingManager.onStart = function(url, item, total){
  console.log("começando")
}

THREE.DefaultLoadingManager.onLoad = function(){
  console.log("finalizado")
  document.getElementById("loader").style.display = "none"
  document.getElementById("containerterra").style.display = "block"
}

const scene = new THREE.Scene();


var bgmaterial = []

const textureft = new THREE.TextureLoader().load('imgs/bg/space_ft.png');
const texturebk = new THREE.TextureLoader().load('imgs/bg/space_bk.png');
const textureup = new THREE.TextureLoader().load('imgs/bg/space_up.png');
const texturedn = new THREE.TextureLoader().load('imgs/bg/space_dn.png');
const texturert = new THREE.TextureLoader().load('imgs/bg/space_rt.png');
const texturelf = new THREE.TextureLoader().load('imgs/bg/space_lf.png');

bgmaterial.push(new THREE.MeshBasicMaterial({map: textureft}));
bgmaterial.push(new THREE.MeshBasicMaterial({map: texturebk}));
bgmaterial.push(new THREE.MeshBasicMaterial({map: textureup}));
bgmaterial.push(new THREE.MeshBasicMaterial({map: texturedn}));
bgmaterial.push(new THREE.MeshBasicMaterial({map: texturert}));
bgmaterial.push(new THREE.MeshBasicMaterial({map: texturelf}));

for(let i = 0; i<6; i++){
  bgmaterial[i].side = THREE.BackSide;
}

const bgGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
const bg = new THREE.Mesh(bgGeometry, bgmaterial)
scene.add(bg)
bg.position.set(100, 100, 100)



// scene.background = (spaceTexture)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.001, 30000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
})
// renderer.autoClear = false;


renderer.setPixelRatio(window.devicePixelRatio);

const sol = new THREE.TextureLoader().load('imgs/sun.jpg');

const geometrysol = new THREE.SphereGeometry(250, 400, 200);
const materialsol = new THREE.MeshStandardMaterial({
  emissive: 0xffd700,
  emissiveMap: sol,
  emissiveIntensity: 1
})
const sun = new THREE.Mesh(geometrysol, materialsol);
sun.position.set(0, 0, 0)


const sunglow = new THREE.TextureLoader().load('imgs/sunglow.png');
const sundis = new THREE.TextureLoader().load('imgs/sundis.png');


var Glow = []
var radius = 250
var opacityval = 1

for (let i = 0; i < 50; i++){
  if (opacityval > 0.001){
  opacityval -= 0.02
  }

  radius += 4
  const geometrysolGlow = new THREE.SphereGeometry(radius, 400, 200);
  // * versão com displacement e normal map, faz o sol ficar instavel
  const materialsolGlow = new THREE.MeshStandardMaterial({emissiveMap: sol, normalMap: sunglow, displacementMap: sundis, transparent: true, opacity: opacityval, emissive: 0xffa500, emissiveIntensity: 0.9 });

  // * versão sem displacement nem normal map, faz o sol ficar reto
  // const materialsolGlow = new THREE.MeshStandardMaterial({emissiveMap: sol, transparent: true, opacity: opacityval, emissive: 0xffa500, emissiveIntensity: 0.9 });
  Glow[i] = new THREE.Mesh(geometrysolGlow, materialsolGlow);


  Glow[i].rotation.z = Math.random()
  Glow[i].rotation.y = Math.random()
  Glow[i].rotation.x = Math.random()
  sun.add(Glow[i])
}



  
const terra = new THREE.TextureLoader().load('terra.767ee1dc.jpg')
const terranormal = new THREE.TextureLoader().load('imgs/terra normal.jpg')

const geometryterra = new THREE.SphereGeometry(10, 90, 30, 100);
const materialterra = new THREE.MeshStandardMaterial({ map: terra, normalMap: terranormal });
const earth = new THREE.Mesh(geometryterra, materialterra)

// earth.add(new THREE.AxesHelper(10))
// inclinação da  terra
earth.rotation.set( 0, 0, - Math.PI * 23 / 180 );


const lua = new THREE.TextureLoader().load('imgs/moon.jpg')
const luanormal = new THREE.TextureLoader().load('imgs/moon normal.png')


const geometrylua = new THREE.SphereGeometry(2.72, 90, 30, 100);
const materiallua = new THREE.MeshStandardMaterial({ map: lua, normalMap: luanormal });
const moon = new THREE.Mesh(geometrylua, materiallua)
moon.position.set(50, 0, 0)
// inclinação da lua
moon.rotation.set( 0, 0, - Math.PI * 23 / 180 );
earth.add(moon)
// moon.add(new THREE.AxesHelper(10))


const marte = new THREE.TextureLoader().load('imgs/mars.jpg')
const martenormal = new THREE.TextureLoader().load('imgs/mars normal.jpg')

const geometrymars = new THREE.SphereGeometry(5.31, 90, 30, 100);
const materialmars = new THREE.MeshStandardMaterial({ map: marte, normalMap: martenormal })
const mars = new THREE.Mesh(geometrymars, materialmars)
// inclinação de marte
mars.rotation.set( 0, 0, - Math.PI * 25 / 180 );
mars.position.set(0, 0, 1000)


const pointlight = new THREE.PointLight(0xffffff, 2)
pointlight.position.set(0, 0, 0)


// const gridhelper = new THREE.GridHelper(200, 50)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);



const netuno = new THREE.TextureLoader().load('imgs/neptune.jpg');

const geometrynetuno = new THREE.SphereGeometry(38, 90, 30, 100);
const materialnetuno = new THREE.MeshStandardMaterial({ map: netuno})
const neptune = new THREE.Mesh(geometrynetuno, materialnetuno)
neptune.position.set(0, 0, 0)
// inclinação de netuno
neptune.rotation.set( 0, 0, - Math.PI * 23 / 180 );



scene.add(sun, earth, pointlight, mars, neptune, ambientLight )

var goSt = false
// declarando que n vai ter nenhuma animação por enqt
var planeta = "terra"
var oldplan = "terra"
var speed = 1000
// planeta inicial sendo terra
GoTo("terra")
animate()
Array(1000).fill().forEach(addStar)







function getmars(){
  const objpos = new Vector3()
  mars.getWorldPosition(objpos)
  return objpos
}

function getearth(){
  const objpos = new Vector3()
  earth.getWorldPosition(objpos)
  return objpos
}

function getmoon(){
  const objpos = new Vector3()
  moon.getWorldPosition(objpos)
  return objpos
}

function getneptune(){
  const objpos = new Vector3()
  neptune.getWorldPosition(objpos)
  return objpos
}


function addStar() {
  const geometryst = new THREE.SphereGeometry(0.5, 24, 24);
  const materialst = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh(geometryst, materialst);
  
  // criando uma array com 3 valores de x, y, z, profundidade, altura, e etc
  // array(3).fill() vai encher a array 3 vezes com 3 valores
  // .map() vai pegar o valor de algm lugar
  // () => THREE... vai pegar um numero aleatorio entre 100 e -100 (vai pegar 3 vezes por causa do array(3))
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(6000));
  
  star.position.set(x, y, z);
  scene.add(star)
}

var rmoon = 50;
var thetamoon = 0;
var dThetamoon = 0.031362963790149;
// var dThetamoon = 0.0220288115246098;

var rmars = 1500;
var thetamars = 0;
var dThetamars = 0.0220288115246098;

var rearth = 1000;
var thetaearth = 0;
var dThetaearth = 0.0281763868338032;

var rneptune = 2000;
var thetaneptune = 0;
var dThetaneptune = 0.00051656709195306;

function animate(){
  requestAnimationFrame(animate);
  
  
  for (let i = 0; i < 50; i++){
    // deixando o sol mais animado, mexendo o fogo
    Glow[i].rotateY(Math.random()/500)
    Glow[i].rotateZ(Math.random()/500)
    Glow[i].rotateX(Math.random()/500)
  }
  
  
  renderer.setSize(window.innerWidth+10, window.innerHeight+10);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix()

  earth.rotateY(0.01)
  
  mars.rotateY(0.005)
  
  moon.rotateY(0.17)

  neptune.rotateY(0.001200480192076831)


  
  if (!goSt){
    // Verifica se algma função go está sendo executada, se sim, pula a orbita pra função poder alcançar o planeta
  thetamoon += dThetamoon;
  moon.position.x = rmoon * Math.cos(thetamoon);
  moon.position.z = -rmoon * Math.sin(thetamoon);
  
  // Orbita da lua
  
  thetamars += dThetamars;
  mars.position.x = rmars * Math.cos(thetamars);
  mars.position.z = rmars * Math.sin(thetamars);
  // Orbita de marte
  
  thetaearth += dThetaearth;
  earth.position.x = rearth * Math.cos(thetaearth);
  earth.position.z = rearth * Math.sin(thetaearth);
  // Orbita da terra

  thetaneptune += dThetaneptune;
  neptune.position.x = rneptune * Math.cos(thetaneptune);
  neptune.position.z = rneptune * Math.sin(thetaneptune);
  // Orbita de netuno


}
if (planeta == "terra"){
  const cameraoffset = new Vector3(-15, 0, 30)
  camera.position.copy(getearth()).add(cameraoffset)
  // copiando a posição do obj e adicionando a distancia desejada
}if (planeta == "marte"){
  const cameraoffset = new Vector3(0, 7, 30)
  camera.position.copy(getmars()).add(cameraoffset) 
}if (planeta == "lua"){
  const cameraoffset = new Vector3(0, 0, 20)
  camera.position.copy(getmoon()).add(cameraoffset)
}if (planeta == "netuno"){
  const cameraoffset = new Vector3(0, 0, 90);
  camera.position.copy(getneptune()).add(cameraoffset);
}
TWEEN.update();
// o tween tem q estar antes do renderer sempre, senão ele vai só teletransportar, afinal é o renderer que faz a animação do tween


renderer.render(scene, camera)

}

var martecam = false
var terracam = false

function GoTo(plan){
  
  if (plan == "netuno"){

    // requestAnimationFrame(go)
    // n pode usar mais de um requestanimationframe pra tween, reclara um milhão de vezes o loop, até pq n tem pq pegar o frame de animação se ela vai ser chamada em uma func q ja pede ele
    const camIni = {x: camera.position.x, z: camera.position.z};
    new TWEEN.Tween(camIni).to({x: neptune.position.x, z: neptune.position.z+90}, 1000).onUpdate(() => camera.position.set(camIni.x, camera.position.y, camIni.z)).onStart(function(){
      goSt = true
      martecam = false
      terracam = false
      // qnd a animação starta faço tds os planetas pararem
    }).onComplete(function(){
      goSt = false
      // dai inicio eles dnv qnd acaba
    }).start();

    planeta = plan


  }
  if (plan == "marte"){

  // requestAnimationFrame(go)
  // n pode usar mais de um requestanimationframe pra tween, reclara um milhão de vezes o loop, até pq n tem pq pegar o frame de animação se ela vai ser chamada em uma func q ja pede ele
  const camIni = {x: camera.position.x, z: camera.position.z};
  new TWEEN.Tween(camIni).to({x: mars.position.x, z: mars.position.z+30}, 1000).onUpdate(() => camera.position.set(camIni.x, camera.position.y, camIni.z)).onStart(function(){
    goSt = true
    martecam = false
    terracam = false
    // qnd a animação starta faço tds os planetas pararem
  }).onComplete(function(){
    goSt = false
    // dai inicio eles dnv qnd acaba
  }).start();

    planeta = plan
    // defino a ser focado com marte agr

    //? setTimeout(function(){
    //?   const CamOff = {y: camera.position.y};
    //?   new TWEEN.Tween(CamOff).to({y: camera.position.y+10}, 3000).onUpdate(() => camera.position.set(camera.position.x, CamOff.y, camera.position.z)).onComplete(function(){martecam = true}).start()
    //? }, 150)

}

  if (plan == "lua"){

    if (oldplan == "terra"){
      speed = 300
    }else{
      speed = 1000
    }

    console.log("a velocidade agora é:", speed)
    var moonpos = new Vector3();
    moon.getWorldPosition(moonpos)
    // A lua, por ser child da terra n funciona como os outros parar pegar pos, tem q pegar manualmente 
    
    const camIni = {x: camera.position.x, z: camera.position.z};
    new TWEEN.Tween(camIni).to({x: moonpos.x+20, z: moonpos.z+20}, speed).onUpdate(() => camera.position.set(camIni.x, camera.position.y, camIni.z)).onStart(function(){
      goSt = true 
      martecam = false
      terracam = false
      // qnd a animação starta faço tds os planetas pararem
    }).onComplete(function(){
      goSt = false
      // dai inicio eles dnv qnd acaba
    }).start();
    
      planeta = plan

    
      // defino a ser focado com lua agr
  }

  if (plan == "terra"){

    if (oldplan = "lua"){
      speed = 300
    }else{
      speed = 1000
    }
    console.log("a velocidade agora é:", speed)

    const camIni = {x: camera.position.x, z: camera.position.z};
    new TWEEN.Tween(camIni).to({x: earth.position.x, z: earth.position.z+30}, speed).onUpdate(() => camera.position.set(camIni.x, camera.position.y, camIni.z)).onStart(function(){
      goSt = true
      martecam = false
      terracam = false
      // qnd a animação starta faço tds os planetas pararem
    }).onComplete(function(){
      goSt = false
      // dai inicio eles dnv qnd acaba
    }).start();
  
      planeta = plan

      // ? setTimeout(function(){
      // ?   const CamOff = {x: camera.position.x};
      // ?   new TWEEN.Tween(CamOff).to({x: camera.position.x-10}, 3000).onUpdate(() => camera.position.set(CamOff.x, camera.position.y, camera.position.z)).onComplete(function(){terracam = true}).start()  
      // ? }, 150)
      // ? defino a ser focado com terra agr
  }
  // camera.lookAt(0, 0, 0)
}

var animrodando = false
var ProxTecla = false

const terrahtml = document.getElementById("containerterra");

terrahtml.addEventListener("animationend", (e) => {ProxTecla = true})

window.addEventListener("wheel", (e) => {

  const martehtml = document.getElementById("containermarte");
  const luahtml = document.getElementById("containerlua");
  const netunohtml = document.getElementById("containernetuno");

  

  console.log("é", e.deltaY)
  if (planeta == "lua" && ProxTecla == true && e.deltaY == -100){
    const scroll = document.getElementById("scroll1")
    
    // alert(window.getComputedStyle(scroll4).marginTop)

    const scrollnet = [
      { marginTop: (window.getComputedStyle(scroll).marginTop) },
      { marginTop: '0.5vh' }
    ]


    scroll.animate(scrollnet, 900).onfinish = (e) => {scroll.style.marginTop = "0.5vh"}


    console.log("indo pra terra")
    ProxTecla = false
    GoTo("terra")
    oldplan = "terra"
    console.log("o tamanho de marte é: ", martehtml.clientWidth)
// ! animação de fechamento dos outros planetas 
    // alert(document.getAnimations())
        if (luahtml.clientHeight != 0){
          const aniLua = [
            { height: "99.5%" },
            { height: '0px' }
          ];
            luahtml.animate(aniLua, 500).onfinish = (e) => {luahtml.style.height = "0";}
        }

        if (martehtml.clientWidth != 0 ){
          console.log("testandoa 1234")
          const aniMarte = [
            { width: '99.5%' },
            { width: '0px' }
          ];
            martehtml.animate(aniMarte, 500).onfinish = (e) => {martehtml.style.width = "0";}
            console.log("marte sendo retirada")
        }

        if (netunohtml.clientWidth != 0){
          const aniNetuno = [
            { width: (netunohtml.clientWidth+'px') },
            { width: '0px' }
          ];
          netunohtml.animate(aniNetuno, 500).onfinish = (e) => {netunohtml.style.width = "0";}
        }
        

// ! animação do proprio planeta

    const aniTerraOpen = [
      { height: '0px' },
      { height: ('100%') }
    ];
    const aniTerraOpenOpt = {
      duration: 1000,
      delay: 500,
      easing: "ease-out"
    }

      terrahtml.animate(aniTerraOpen, aniTerraOpenOpt).onfinish = (e) => {terrahtml.style.height = "99.5%"; ProxTecla = true;}
  }if ((planeta == "terra" && ProxTecla == true && e.deltaY == 100) || (planeta == "marte" && ProxTecla == true && e.deltaY == -100)){
    const scroll = document.getElementById("scroll1")
    
    // alert(window.getComputedStyle(scroll4).marginTop)

    const scrollnet = [
      { marginTop: (window.getComputedStyle(scroll).marginTop) },
      { marginTop: '25vh' }
    ]


    scroll.animate(scrollnet, 900).onfinish = (e) => {scroll.style.marginTop = "25vh"}

    
    console.log("indo pra lua")
    ProxTecla = false
    GoTo("lua")
    oldplan = "lua"
// ! animação de fechamento dos outros planetas
        if (terrahtml.clientHeight != 0){
          const aniTerra = [
            { height: "99.5%" },
            { height: '0px' }
          ];
            terrahtml.animate(aniTerra, 500).onfinish = (e) => {terrahtml.style.height = "0";}
        }

        if (martehtml.clientWidth != 0 ){
          const aniMarte = [
            { width: '99.5%' },
            { width: '0px' }
          ];
            martehtml.animate(aniMarte, 500).onfinish = (e) => {martehtml.style.width = "0";}
        }

        if (netunohtml.clientWidth != 0){
          const aniNetuno = [
            { width: "20%" },
            { width: '0px' }
          ];
          netunohtml.animate(aniNetuno, 500).onfinish = (e) => {netunohtml.style.width = "0";}
        }
    

// ! animação do proprio planeta
      luahtml.style.display = "block"


      const aniLuaOpen = [
        { height: '0px' },
        { height: ('99.5%') }
      ];
      const aniLuaOpenOpt = {
        duration: 1000,
        delay: 500,
        easing: "ease-out"
      }

        luahtml.animate(aniLuaOpen, aniLuaOpenOpt).onfinish = (e) => {luahtml.style.height = "99.5%"; ProxTecla = true;}
  }if ((planeta == "lua" && ProxTecla == true && e.deltaY == 100) || (planeta == "netuno" && ProxTecla == true && e.deltaY == -100)){
    const scroll = document.getElementById("scroll1")
    
    // alert(window.getComputedStyle(scroll4).marginTop)

    const scrollnet = [
      { marginTop: (window.getComputedStyle(scroll).marginTop) },
      { marginTop: '49.5vh' }
    ]


    scroll.animate(scrollnet, 900).onfinish = (e) => {scroll.style.marginTop = "49.5vh"}

    
    console.log("indo pra marte")
    ProxTecla = false
    GoTo("marte")
    oldplan = "marte"
    
    // ! animação de fechamento dos outros planetas
        if (terrahtml.clientHeight != 0){
        const aniTerra = [
          { height: (terrahtml.clientHeight+'px') },
          { height: '0px' }
        ];
          terrahtml.animate(aniTerra, 500).onfinish = (e) => {terrahtml.style.height = "0";}
      }

      if (luahtml.clientHeight != 0 ){
        const aniLua = [
          { height: ('99.5%') },
          { height: '0px' }
        ];
          luahtml.animate(aniLua, 500).onfinish = (e) => {luahtml.style.height = "0";}
      }

      if (netunohtml.clientWidth != 0){
        const aniNetuno = [
          { width: (netunohtml.clientWidth+'px') },
          { width: '0px' }
        ];
        netunohtml.animate(aniNetuno, 500).onfinish = (e) => {netunohtml.style.width = "0";}
      }
      // terrahtml.style.animation = "popout1 1s ease-in"

    console.log(martehtml.clientWidth)
// ! animação de abertura do proprio planeta 
    
      martehtml.style.display = "block"

    const aniMarteOpen = [
      { width: '0px' },
      { width: '99.5%' }
    ];
    const aniMarteOpenOpt = {
      duration: 1000,
      delay: 500,
      easing: "ease-out"
    }


    martehtml.animate(aniMarteOpen, aniMarteOpenOpt).onfinish = (e) => {martehtml.style.width = "99.5%"; ProxTecla = true}
  }if ((planeta == "marte" && ProxTecla == true && e.deltaY == 100)){


    const scroll = document.getElementById("scroll1")
    
    // alert(window.getComputedStyle(scroll4).marginTop)

    const scrollnet = [
      { marginTop: (window.getComputedStyle(scroll).marginTop) },
      { marginTop: '74.5vh' }
    ]


    scroll.animate(scrollnet, 900).onfinish = (e) => {scroll.style.marginTop = "74.5vh"}



    console.log("indo pra netuno")
    ProxTecla = false
    GoTo("netuno")
    oldplan = "netuno"

// ! animação de fechamento dos outros planetas 
      if (luahtml.clientHeight != 0){
        const aniLua = [
          { height: (luahtml.clientHeight+'px') },
          { height: '0px' }
        ];
          luahtml.animate(aniLua, 500).onfinish = (e) => {luahtml.style.height = "0";}
      }

      if (martehtml.clientWidth != 0 ){
        const aniMarte = [
          { width: (martehtml.clientWidth+'px') },
          { width: '0px' }
        ];
          martehtml.animate(aniMarte, 500).onfinish = (e) => {martehtml.style.width = "0";}
      }

      if (terrahtml.clientHeight != 0){
        const aniTerra = [
          { height: (terrahtml.clientHeight+'px') },
          { height: '0px' }
        ];
          terrahtml.animate(aniTerra, 500).onfinish = (e) => {terrahtml.style.height = "0";}
      }
// ! animação do proprio planeta
      netunohtml.style.display = "block"


    const aniNetunoOpen = [
      { width: '0px' },
      { width: ('20%') }
    ];
    const aniNetunoOpenOpt = {
      duration: 1000,
      delay: 500,
      easing: "ease-out"
    }

      netunohtml.animate(aniNetunoOpen, aniNetunoOpenOpt).onfinish = (e) => {netunohtml.style.width = "20%"; ProxTecla = true;}
  }
})

}