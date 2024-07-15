const logo = ['c', 'n', 'k', 't'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const cards = [];
let score_c = 0, score_u = 0;
let user_choose = [];
let comp_choose = [];
let temp_c = 0;
let count = 0;
for (let i = 0; i < logo.length; i++) {
  for (let j = 0; j < numbers.length; j++) {
    cards.push([logo[i], numbers[j]]);
    dxc.innerHTML += ` <section class="_">
           
        <p>${numbers[j]}</p>
    <img src="src/${logo[i]}.png">
        <i class="fa fa " style="color:grey;font-size:0.5rem;">${temp_c + 1}</i>
        </section>`;
    temp_c++;
  }
}

// console.log(cards);



const Card_Distribution = () => {
  let [x, y, z] = [Math.floor(Math.random() * 52), Math.floor(Math.random() * 52), Math.floor(Math.random() * 52)];
  if ((x == y) || (x == z) || (y == z)) {

    while ((x == y) || (x == z) || (y == z)) {
      [x, y, z] = [Math.floor(Math.random() * 52), Math.floor(Math.random() * 52), Math.floor(Math.random() * 52)];

    }
  }
  user_choose.push(...[x, y, z]);
  return [x, y, z];

}


const render_User = () => {
  const u_card = document.querySelectorAll("._");
  const data = Card_Distribution();

  for (let i = 0; i < data.length; i++) {
    u_card[i].innerHTML = ` <p>${cards[data[i]][1]}</p>
    <img src="src/${cards[data[i]][0]}.png">
    `;
  }


}

const render_Comp = () => {
  // console.log(user_choose);
  const c_card = document.querySelectorAll("._c");
  const [a, b, c] = user_choose;
  let [x, y, z] = [Math.floor(Math.random() * 52), Math.floor(Math.random() * 52), Math.floor(Math.random() * 52)];
  if ((x == y) || (x == z) || (y == z) || (x == a) || (x == b) || (x == c) || (y == a) || (y == b) || (y == c) || (z == a) || (z == b) || (z == c)) {

    while ((x == y) || (x == z) || (y == z) || (x == a) || (x == b) || (x == c) || (y == a) || (y == b) || (y == c) || (z == a) || (z == b) || (z == c)) {
      [x, y, z] = [Math.floor(Math.random() * 52), Math.floor(Math.random() * 52), Math.floor(Math.random() * 52)];

    }
  }
  const data = [x, y, z];
  comp_choose.push(...data);
  for (let i = 0; i < c_card.length; i++) {
    c_card[i].innerHTML = `
  <p>${cards[data[i]][1]}</p>
    <img src="src/${cards[data[i]][0]}.png">
  `;
  }


}


const actual = (x) => {
  if (+x) {
    return +x;
  } else {
    return ((x == 'J') ? 11 : (x == 'Q') ? 12 : (x == 'K') ? 13 : 14);
  }
}
const win = (x=-1) => {

if(x==-1){
  whow.innerText = "draw match";
}

  if (x==1) {
    score_u++;
    whow.innerText = "user. win match";
    
  }
  else {
    score_c++;
    whow.innerText = "comp. win match";
    
  }
}



//  [sign,number] //0   1   2   3   4
//         >>>>  [tri,ranu,clr,pair,big] >>>>
let sts_user = [0, 0, 0, 0, 0];
let sts_comp = [0, 0, 0, 0, 0];
const find_Tri = (u, c) => {


  const [x, y, z] = [cards[u[0]][1], cards[u[1]][1], cards[u[2]][1]];
  //check user 
  sts_user[0] = (((x == y) && (y == z) && (z == x)) ? 1 : 0);


  const [a, b, d] = [cards[c[0]][1], cards[c[1]][1], cards[c[2]][1]];
  //check comp
  sts_comp[0] = (((a == b) && (b == d) && (d == a)) ? 1 : 0);



}
const find_Ranu = (u, c) => {
  //check user
  const [x, y, z] = [actual(cards[u[0]][1]), actual(cards[u[1]][1]), actual(cards[u[2]][1])];
  let dem_dt = [x, y, z];
  dem_dt.sort((a, b) => a - b);
  const demx = [...dem_dt];
  if ((dem_dt[0] == dem_dt[1] - 1) && (dem_dt[0] == dem_dt[2] - 2)) {
    sts_user[1] = 1;
  }



  //check comp
  const [a, b, d] = [actual(cards[c[0]][1]), actual(cards[c[1]][1]), actual(cards[c[2]][1])];
  dem_dt = [a, b, d];
  dem_dt.sort((a, b) => a - b);
  if ((dem_dt[0] == dem_dt[1] - 1) && (dem_dt[0] == dem_dt[2] - 2)) {
    sts_comp[1] = 1;
  }



//special case A-2-3
//user
  if(demx[0] == 2 && demx[1] == 3 && demx[2] == 14){
    sts_user[1] = 1;
  }
  if(dem_dt[0] == 2 && dem_dt[1] == 3 && dem_dt[2] == 14){
    sts_comp[1] = 1;
  }




}


const find_Color = (u, c) => {
  //check user

  const [x, y, z] = [cards[u[0]][0], cards[u[1]][0], cards[u[2]][0]];
  sts_user[2] = (((x == y) && (y == z) && (z == x)) ? 1 : 0);
  //check comp
  const [a, b, d] = [cards[c[0]][0], cards[c[1]][0], cards[c[2]][0]];
  sts_comp[2] = (((a == b) && (b == d) && (d == a)) ? 1 : 0);



}
const find_Pair = (u, c) => {

  const [x, y, z] = [cards[u[0]][1], cards[u[1]][1], cards[u[2]][1]];
  //check user 
  sts_user[3] = (((x == y) || (y == z) || (z == x)) ? 1 : 0);


  const [a, b, d] = [cards[c[0]][1], cards[c[1]][1], cards[c[2]][1]];
  //check comp
  sts_comp[3] = (((a == b) || (b == d) || (d == a)) ? 1 : 0);

}

const find_big = (u, c) => {

  const [x, y, z] = [actual(cards[u[0]][1]), actual(cards[u[1]][1]), actual(cards[u[2]][1])];
  //check user 
  const temp_u = [x, y, z];
  temp_u.sort((a, b) => a - b);

  const [a, b, d] = [actual(cards[c[0]][1]), actual(cards[c[1]][1]), actual(cards[c[2]][1])];
  //check comp
  const temp_c = [a, b, d];
  temp_c.sort((a, b) => a - b);
  
 

  if (temp_c[2] < temp_u[2]) {
    sts_user[4] = 1;
    return;
  } else if (temp_c[2] > temp_u[2]) {
    sts_comp[4] = 1;
    return;
  } else if (temp_c[2] == temp_u[2]) {

    if (temp_c[1] < temp_u[1]) {
      sts_user[4] = 1;
      return;
    } else if (temp_c[1] > temp_u[1]) {
      sts_comp[4] = 1;
      return;
    } else if (temp_c[1] == temp_u[1]) {

      if (temp_c[0] < temp_u[0]) {
        sts_user[4] = 1;
        return;
      } else if (temp_c[0] > temp_u[0]) {
        sts_comp[4] = 1;
        return;
      } else if (temp_c[0] == temp_u[0]) {
        //nothing todo
        return;
      }


    }

  }






}



// score_c++;
// score_u++;
// render_Score(1);
// render_Score(0);

const Check = () => {
  const [u, c] = [user_choose, comp_choose];
  find_Tri(u, c);
  find_Ranu(u, c);
  find_Color(u, c);
  find_Pair(u, c);
  find_big(u, c);

  //         >>>>  [tri,ranu,clr,pair,big] >>>>
  //0->c 1->u
  console.log("> (5) [t, r, c, p, b]");
  console.log(sts_user);
  console.log(sts_comp);
const sysms = ["tri","sequnce","colour","pair","big"];
let i=0;
for(i=0; i<=4; i++){

  if(sts_comp[i] != sts_user[i]){
    if(sts_comp[i]==1){
          win(0);
          due.innerText=`${sysms[i]} card of comp.`;
          return;
    }else{
      win(1);
      due.innerText=`${sysms[i]} card of user.`;
      return;
    }
    
  }
  
}

//draw purpose
if(i!=4){
  return;
}
win();


 
}

//if c->0 u->1
const render_Score = () => {
    id_user_score.innerText = score_u;
    id_comp_score.innerText = score_c;
  
}

const render_Animation_Sound=()=>{
  
  _mix.style.display="flex";
  const txa = setTimeout(()=>{

_mix.style.display="none";
clearTimeout(txa);
  },1500);


}

const Play = () => {

  render_Animation_Sound();
  render_User();
  render_Comp();
  Check();
  render_Score();
  count++;
  cnt.innerText = count;
  user_choose = [];
  comp_choose = [];
  sts_user = [0, 0, 0, 0, 0];
  sts_comp = [0, 0, 0, 0, 0];
}




//animation render

_mix.innerHTML="<h1>Teen Pati Cards Mixing ...</h1>";
for(let i=0; i<54; i++){

  _mix.innerHTML+="<div></div>";
}

render_Animation_Sound();