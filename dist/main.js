!function(){"use strict";function t(t,e){if("number"!=typeof t||"number"!=typeof e)throw new Error("Указано не число!");if(t>=e**2)throw new Error("Неверный индекс");let a="center";const s=e-1,i=e**2-1,r=e**2-e;switch(t<s&&(a="top"),(t+1)%e==0&&(a="right"),t>r&&t<i&&(a="bottom"),t%e==0&&(a="left"),t){case 0:a="top-left";break;case s:a="top-right";break;case i:a="bottom-right";break;case r:a="bottom-left"}return a}const e={prairie:"prairie",desert:"desert",arctic:"arctic",mountain:"mountain"},a={};let s=1;for(let t of Object.values(e))a[`Level ${s}`]=t,s++;var i=e,r={auto:"auto",pointer:"pointer",crosshair:"crosshair",notallowed:"not-allowed"};class l{constructor(t){this.team=t}}const o=(t,e)=>{for(let a=0;a<e;a+=1)t.attack=Math.round(1.3*t.attack),t.defence=Math.round(1.3*t.defence);return t};function n(t,e,a,s){const i=[],r=function*(t,e){const a=t.length;for(;;){const s=Math.floor(Math.random()*a),i=Math.floor(1+Math.random()*e);let r=new(0,t[s])(i);i>1&&(r=o(r,i)),yield r}}(t,e);for(let t=0;t<a;t++){const t=r.next().value;i.push(t)}return new l(i)}class c{constructor(t,e){if("number"!=typeof e)throw new Error("position must be a number");this.character=t,this.position=e}}class h{constructor(){this.activeMove="player",this.playerLvl=1,this.points=0,this.historyPoints=[],this.activeCharacter=!1,this.possibleAttackRange=[],this.possibleMoveRange=[]}changeMove(){const t="player"===this.activeMove?"PC":"player";this.activeMove=t}clearGameState(){this.activeCharacter=!1,this.possibleAttackRange=[],this.possibleMoveRange=[]}static calcPossibleCellsAttack(t,e,a){const s=h.shiftAttackTop(t,e,a),i=h.shiftAttackRight(t,e,a),r=h.shiftAttackDown(t,e,a),l=h.shiftAttackLeft(t,e,a),o=i-l,n=r+(i-t),c=[];for(let a=s-(t-l);a<=n;a+=e)for(let e=0;e<=o;e+=1){const s=a+e;s!=t&&c.push(s)}return c}static shiftAttackTop(t,e,a){const s=t-e*a;if(s>0)return s;let i=t;for(let a=t;a>=e;a-=e)i-=e;return i}static shiftAttackRight(t,e,a){const s=t+a;let i,r=t;for(let t=0;t<e;t++)if(0==(r+t+1)%e){r+=t;break}return i=r>s?s:r,i}static shiftAttackDown(t,e,a){const s=t+e*a;if(s<e**2)return s;let i=t;for(let a=t;a<e**2-e;a+=e)i+=e;return i}static shiftAttackLeft(t,e,a){const s=t-a;let i,r=t;for(let t=1;t<e;t++)if(0==(r-t)%e){r-=t;break}return i=r<s?s:r,i}static calcPossibleCellsMove(t,e,a,s={top:!0,right:!0,down:!0,left:!0}){const i=h.calcPossibleSteps(t,e,a,s).map((e=>{if(0!=e)return e+t}));return i.sort(((t,e)=>t-e)),i}static calcPossibleSteps(t,e,a,s){const i=[];for(let r=1;r<=a;r+=1){const a=h.calcPossibleRangesForStep(t,e,r,s);i.push(...a)}return i}static calcPossibleRangesForStep(t,e,a,s){const{top:i,right:r,down:l,left:o}=s;let n=!1,c=!1,h=!1,m=!1;const g=[];return i&&t>=e*a&&(o&&r&&g.push(-e*a),n=!0),o&&t%e>=a&&(i&&l&&g.push(-1*a),h=!0),l&&t<e**2-e*a&&(o&&r&&g.push(e*a),c=!0),r&&(t+a)%e>=a&&(i&&l&&g.push(1*a),m=!0),n&&h&&g.push((-e-1)*a),n&&m&&g.push((1-e)*a),c&&m&&g.push((e+1)*a),c&&h&&g.push((e-1)*a),g}}const m={top:!0,right:!1,down:!0,left:!0},g=(t,e)=>{const a=[];for(let t of e)a.push(t.position);const s=[];for(let e of t)a.includes(e)||s.push(e);return s},d=t=>{const e=t.length;return t[Math.floor(Math.random()*e)]};var v=(t,e)=>{const a=t.teamPlayer,s=[...t.teamPlayer,...t.teamPC],i=(t=>{const e=t,a=[];for(let t=e.length;t>0;t-=1){const s=Math.floor(Math.random()*t);a.push(...e.splice(s,1))}return e.push(...a),e})(t.teamPC),r=((t,e,a)=>{let s={attacker:null,target:null,valueAttack:null,diffAttackDef:null};for(let i of t){const t=h.calcPossibleCellsAttack(i.position,a,i.character.attackRange);for(let a of e)if(t.includes(a.position)){const t=i.character.attack-a.character.defence,e=i.character.attack;(t>s.diffAttackDef||e>s.valueAttack)&&(s={attacker:i,target:a,valueAttack:e,diffAttackDef:t})}}return!!s.attacker&&{type:"attack",attacker:s.attacker,target:s.target}})(i,a,e);if(r)return r;const l=((t,e,a)=>{for(let s of t){const t=h.calcPossibleCellsMove(s.position,a,s.character.moveRange,m),i=g(t,e);if(i.length>0)return{type:"move",mover:s,target:d(i)}}return!1})(i,s,e);if(l)return l;const o=((t,e,a)=>{for(let s of t){const t=h.calcPossibleCellsMove(s.position,a,s.character.moveRange),i=g(t,e);if(i.length>0)return{type:"move",mover:s,target:d(i)}}return!1})(i,s,e);return o||!1};class u{constructor(t,e="generic"){if(this.level=t,this.attack=0,this.defence=0,this.health=50,this.type=e,this.moveRange=0,this.attackRange=0,"Character"===new.target.name)throw new Error("Неверно вызван конструктор!")}}class P extends u{constructor(t){super(t,"bowman"),this.attack=25,this.defence=25,this.moveRange=2,this.attackRange=2}}class C extends u{constructor(t){super(t,"swordsman"),this.attack=40,this.defence=10,this.moveRange=4,this.attackRange=1}}class p extends u{constructor(t){super(t,"magician"),this.attack=10,this.defence=40,this.moveRange=1,this.attackRange=4}}class y extends u{constructor(t){super(t,"vampire"),this.attack=25,this.defence=25,this.moveRange=2,this.attackRange=2}}class f extends u{constructor(t){super(t,"undead"),this.attack=40,this.defence=10,this.moveRange=4,this.attackRange=1}}class S extends u{constructor(t){super(t,"daemon"),this.attack=10,this.defence=40,this.moveRange=1,this.attackRange=4}}class L{constructor(t,e){this.gamePlay=t,this.stateService=e,this.gameState=new h,this.gamePlay.cursors=r,this.gamePlay.themes=Object.values(i)}init(){this.gamePlay.drawUi(this.gamePlay.themes[0]),this.createPossibleCharacters(),this.registerEvent(),this.loadHistoryPoints(),this.gamePlay.showMaxPoints(this.gameState.historyPoints[0]),this.gamePlay.showCurrentPoints(0),this.calcField(),this.createStartingPosition()}calcField(){const t=this.gamePlay.boardSize,e=t**2;this.gamePlay.fieldSize=e,this.gamePlay.firstCellForPC=t-2}createPossibleCharacters(){this.gamePlay.charactersForPlayer=[P,C,p],this.gamePlay.charactersForPC=[y,f,S]}createStartingPosition(){const t=this.createTeam(this.gamePlay.charactersForPlayer,this.gamePlay.maxStartLvl,this.gamePlay.countCharacterTeam),e=this.createTeam(this.gamePlay.charactersForPC,this.gamePlay.maxStartLvl,this.gamePlay.countCharacterTeam),a=this.calcPositioningTeam(0,this.gamePlay.fieldSize,this.gamePlay.boardSize,t),s=this.calcPositioningTeam(this.gamePlay.firstCellForPC,this.gamePlay.fieldSize,this.gamePlay.boardSize,e),i=this.mergeTeams(a,s);this.savePositionTeam(i),this.positioning(i)}mergeTeams(t,e){return{teamPlayer:t,teamPC:e}}createTeam(t,e,a){return n(t,e,a)}calcPositioningTeam(t,e,a,s){const i=L.creatingArrayFromCharacter(t,e,a);return L.creatinfArrayPositions(i,s.team)}savePositionTeam(t){this.gameState.teams=t}registerEvent(){this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)),this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.gamePlay.addNewGameListener(this.onNewGame.bind(this)),this.gamePlay.addSaveGameListener(this.onSaveGame.bind(this)),this.gamePlay.addLoadGameListener(this.onLoadGame.bind(this))}clearEvent(){this.gamePlay.cellEnterListeners=[],this.gamePlay.cellLeaveListener=[],this.gamePlay.cellClickListeners=[]}static creatingArrayFromCharacter(t,e,a){const s=[];for(let i=t;i<e;i+=a)s.push(i),s.push(i+1);return s}static creatinfArrayPositions(t,e){const a=[];for(let s=0;s<e.length;s+=1){const i=t.length,r=Math.floor(Math.random()*i),l=t.splice(r,1),o=Number(l[0]),n=new c(e[s],o);a.push(n)}return a}positioning(t){const e=[...t.teamPlayer,...t.teamPC];this.gamePlay.redrawPositions(e)}onCellClick(t){if("PC"===this.gameState.activeMove)return void this.gamePlay.showError("Сейчас не ваш ход!");const e=this.gameState.teams.teamPC.find((e=>e.position===t))||!1,a=this.gameState.teams.teamPlayer.find((e=>e.position===t))||!1,s=this.gameState.activeCharacter;a?this.changeCharacter(t,a):s&&e?this.gameState.possibleAttackRange.indexOf(t)>-1?this.attackCharacter(s,e):this.gamePlay.showError("Враг слишком далеко!"):!s||e||a?!s&&e&&this.gamePlay.showError("Нужно выбрать своего персонажа!"):this.gameState.possibleMoveRange.indexOf(t)>-1?this.moveCharacter(s,t):this.gamePlay.showError("Слишком далеко, я сюда не дойду!")}onCellEnter(t){const e=this.gameState.teams.teamPlayer.find((e=>e.position==t))||this.gameState.teams.teamPC.find((e=>e.position==t));this.gameState.activeCharacter&&this.initActiveCell(t),e&&this.createMessage(e.character,t)}createMessage(t,e){const a=`🎖 ${t.level} ❤ ${t.health} ⚔ ${t.attack} 🛡 ${t.defence}`;this.gamePlay.showCellTooltip(a,e)}onCellLeave(t){this.gamePlay.hideCellTooltip(t),this.clearCellFromDecoration(t)}initActiveCell(t){if(t===this.gameState.activeCharacter.position)return;const e=this.gameState.teams.teamPlayer.find((e=>t===e.position))||!1,a=this.gameState.teams.teamPC.find((e=>t===e.position))||!1;e?this.activeCellForChangeCharacter(t):a?this.gameState.possibleAttackRange.indexOf(t)>=0?this.activeCellForAttack(t):this.activeInacessibleCell(t):this.gameState.possibleMoveRange.indexOf(t)>=0?this.activeCellForMove(t):this.activeInacessibleCell(t)}activeCellForChangeCharacter(t){this.gamePlay.setCursor(this.gamePlay.cursors.pointer)}activeCellForAttack(t){this.gamePlay.setCursor(this.gamePlay.cursors.crosshair),this.gamePlay.selectCell(t,"red")}activeCellForMove(t){this.gamePlay.setCursor(this.gamePlay.cursors.pointer),this.gamePlay.selectCell(t,"green")}activeInacessibleCell(t){this.gamePlay.setCursor(this.gamePlay.cursors.notallowed)}calcCellsForMove(){if(!this.gameState.activeCharacter)return;const{character:t,position:e}=this.gameState.activeCharacter,a=t.moveRange,s=h.calcPossibleCellsMove(e,this.gamePlay.boardSize,a);this.gameState.possibleMoveRange=s}calcCellsForAttack(){if(!this.gameState.activeCharacter)return;const{character:t,position:e}=this.gameState.activeCharacter,a=t.attackRange,s=h.calcPossibleCellsAttack(e,this.gamePlay.boardSize,a);this.gameState.possibleAttackRange=s}moveCharacter(t,e){const a=t.position,s=e,i=this.returnTeam(t),r=i.indexOf(t);t.position=s,i.splice(r,1,t),this.gameState.clearGameState(),this.clearCellFromDecoration(a),this.clearCellFromDecoration(s),this.positioning(this.gameState.teams),"newLvl"===this.gameState.activeMove?this.gameState.activeMove="player":this.gameState.changeMove(),"PC"===this.gameState.activeMove&&this.actionPC()}attackCharacter(t,e){const a=this.calcDamage(t,e);this.gamePlay.showDamage(a,t,e,this.updateCharacters.bind(this))}calcDamage(t,e){const a=Math.round(Math.max((t.character.attack-e.character.defence)/2,.2*t.character.attack));return"player"===this.gameState.activeMove?this.gameState.points+=a:(this.gameState.points-=a,this.gameState.points<0&&(this.gameState.points=0)),this.gamePlay.showCurrentPoints(this.gameState.points),a}changeCharacter(t,e){this.gameState.activeCharacter&&this.gamePlay.deselectCell(this.gameState.activeCharacter.position),this.gamePlay.selectCell(t),this.gameState.activeCharacter=e,this.calcCellsForMove(),this.calcCellsForAttack(),this.gamePlay.showCellsForMove(this.gameState.possibleMoveRange),this.gamePlay.showCellsForAttack(this.gameState.possibleAttackRange,this.gameState.teams.teamPC)}clearCellFromDecoration(t){this.gamePlay.setCursor(this.gamePlay.cursors.auto),t!==this.gameState.activeCharacter.position&&this.gamePlay.deselectCell(t)}updateCharacters(t,e,a){const s=a.character.health-t;s<=0?this.deathCharacter(a):a.character.health=s,this.gameState.clearGameState(),this.clearCellFromDecoration(e.position),this.clearCellFromDecoration(a.position),"newLvl"===this.gameState.activeMove?this.gameState.activeMove="player":this.gameState.changeMove(),this.positioning(this.gameState.teams),"PC"===this.gameState.activeMove&&this.actionPC()}returnTeam(t){return this.gameState.teams.teamPlayer.includes(t)?this.gameState.teams.teamPlayer:this.gameState.teams.teamPC}deathCharacter(t){const e=this.returnTeam(t),a=e.indexOf(t);e.splice(a,1),0===this.gameState.teams.teamPlayer.length&&this.gameOver(),0===this.gameState.teams.teamPC.length&&this.levelUp()}actionPC(){this.gamePlay.clearCellsForMove(),this.gamePlay.clearCellsForAttack();const t=v(this.gameState.teams,this.gamePlay.boardSize);if(t||(this.gameState.activeMove="player"),"attack"===t.type){const{attacker:e,target:a}=t;this.attackCharacter(e,a)}if("move"===t.type){const{mover:e,target:a}=t;this.moveCharacter(e,a)}}levelUp(){this.gameState.playerLvl<=999?(this.gameState.playerLvl+=1,this.startNewLvl()):(this.gamePlay.showMessage(`Ура! Победа! Ты набрал ${this.gameState.points} очков!`),this.addItemForHistoryPoints(),this.clearEvent())}startNewLvl(){this.addItemForHistoryPoints();const t=this.gamePlay.maxStartLvl+(this.gameState.playerLvl-1),e=n(this.gamePlay.charactersForPC,t,this.gamePlay.countCharacterTeam),a=function(t){let e=[];for(let a of t){const t=a.character,s=t.health;t.attack=Math.round(Math.max(t.attack,t.attack*(80+s)/100)),t.defence=Math.round(Math.max(t.defence,t.defence*(80+s)/100));const i=s+80;t.health=i>100?100:i,t.level+=1,e.push(t)}return new l(e)}(this.gameState.teams.teamPlayer),s=this.calcPositioningTeam(this.gamePlay.firstCellForPC,this.gamePlay.fieldSize,this.gamePlay.boardSize,e);console.log(a,e);const i=this.calcPositioningTeam(0,this.gamePlay.fieldSize,this.gamePlay.boardSize,a);this.gameState.teams={teamPC:s,teamPlayer:i},this.gameState.activeMove="newLvl",this.gamePlay.drawUi(this.selectTheme()),this.positioning(this.gameState.teams),this.gamePlay.showMaxPoints(this.gameState.historyPoints[0]),this.gamePlay.showCurrentPoints(this.gameState.points)}gameOver(){this.gamePlay.showMessage(`Ты проиграл... Но успел набрать ${this.gameState.points} очков!`),this.addItemForHistoryPoints(),this.clearEvent()}addItemForHistoryPoints(){const t=Date.now(),e={points:this.gameState.points,date:t},a=this.gameState.historyPoints;a.push(e),a.sort(((t,e)=>e.points-t.points)),a.length>5&&a.pop(),this.saveHistoryPoints()}saveHistoryPoints(){const t=JSON.stringify(this.gameState.historyPoints);t&&localStorage.setItem("historyPoints",t)}loadHistoryPoints(){const t=JSON.parse(localStorage.getItem("historyPoints"));t&&(this.gameState.historyPoints=t)}onNewGame(){this.gameState.activeCharacter&&(this.gamePlay.deselectCell(this.gameState.activeCharacter.position),this.gameState.clearGameState(),this.gamePlay.clearCellsForMove(),this.gamePlay.clearCellsForAttack()),this.gameState.points=0,this.gameState.activeMove="player",this.gameState.playerLvl=1,this.gamePlay.showCurrentPoints(0),this.addItemForHistoryPoints(),this.gameState.activeCharacter&&this.gamePlay.deselectCell(this.gameState.activeCharacter.position),0===this.gamePlay.cellEnterListeners.length&&this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),0===this.gamePlay.cellLeaveListeners.length&&this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)),0===this.gamePlay.cellClickListeners.length&&this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.gamePlay.drawUi(this.selectTheme()),this.createStartingPosition()}onSaveGame(){this.addItemForHistoryPoints(),this.gamePlay.showMaxPoints(this.gameState.historyPoints[0]),this.stateService.save(this.gameState)}onLoadGame(){console.log(this),this.gamePlay.clearCellsForMove(),this.gamePlay.clearCellsForAttack();const t=this.stateService.load();if(t instanceof Error)this.gamePlay.showError(atate.message);else{this.saveHistoryPoints(),this.gameState.activeCharacter&&this.gamePlay.deselectCell(this.gameState.activeCharacter.position);for(let e in t)this.gameState[e]=null,this.gameState[e]=t[e];this.gamePlay.showCurrentPoints(this.gameState.points),0===this.gamePlay.cellEnterListeners.length&&this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),0===this.gamePlay.cellLeaveListeners.length&&this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)),0===this.gamePlay.cellClickListeners.length&&this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.gamePlay.drawUi(this.selectTheme()),this.positioning(this.gameState.teams),this.gamePlay.showMaxPoints(this.gameState.historyPoints[0]),this.gamePlay.showCurrentPoints(this.gameState.points),this.gameState.activeCharacter&&this.onCellClick(this.gameState.activeCharacter.position),"PC"===this.gameState.activeMove&&this.actionPC()}}selectTheme(){const t=this.gamePlay.themes.length,e=(this.gameState.playerLvl-1)%t;return this.gamePlay.themes[e]}resetGameState(){this.gameState.clearGameState(),this.gameState.activeMove="player",this.gameState.playerLvl=1,this.gameState.points=0,this.gameState.teams=null}}const k=new class{constructor(){this.boardSize=8,this.countCharacterTeam=5,this.maxStartLvl=3,this.maxPossibLvl=999,this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[],this.cellMaxPoints=null,this.cellCurrentPoints=null,this.message=null}bindToDOM(t){if(!(t instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=t}drawUi(e){this.checkBinding(),this.container.innerHTML='\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n      </div>\n      <div class="points">\n        <div data-id="points-current" class="points-pole">\n          <span class="points-pole-descrip">Набрано очков: </span>\n          <span data-id="points-current-value" class="points-pole-value"></span>\n        </div>\n        <div data-id="points-max" class="points-pole">\n          <span class="points-pole-descrip">Максимум очков: </span>\n          <span data-id="points-max-value" class="points-pole-value"></span>\n        </div>\n      </div>\n      <div id-data="message" class="message hidden-item">\n        Тут бубу показываться сообщения вместо алертов\n      </div>\n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n    ',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",(t=>this.onNewGameClick(t))),this.saveGameEl.addEventListener("click",(t=>this.onSaveGameClick(t))),this.loadGameEl.addEventListener("click",(t=>this.onLoadGameClick(t))),this.cellMaxPoints=this.container.querySelector("[data-id=points-max]"),this.cellCurrentPoints=this.container.querySelector("[data-id=points-current]"),this.boardEl=this.container.querySelector("[data-id=board]"),this.boardEl.classList.add(e);for(let e=0;e<this.boardSize**2;e+=1){const a=document.createElement("div");a.classList.add("cell","map-tile",`map-tile-${t(e,this.boardSize)}`),a.addEventListener("mouseenter",(t=>this.onCellEnter(t))),a.addEventListener("mouseleave",(t=>this.onCellLeave(t))),a.addEventListener("click",(t=>this.onCellClick(t))),this.boardEl.appendChild(a)}this.cells=Array.from(this.boardEl.children)}redrawPositions(t){for(const t of this.cells)t.innerHTML="";for(const a of t){const t=this.boardEl.children[a.position],s=document.createElement("div");s.classList.add("character",a.character.type);const i=document.createElement("div");i.classList.add("health-level");const r=document.createElement("div");r.classList.add("health-level-indicator","health-level-indicator-"+((e=a.character.health)<15?"critical":e<50?"normal":"high")),r.style.width=`${a.character.health}%`,i.appendChild(r),s.appendChild(i),t.appendChild(s)}var e}addCellEnterListener(t){this.cellEnterListeners.push(t)}addCellLeaveListener(t){this.cellLeaveListeners.push(t)}addCellClickListener(t){this.cellClickListeners.push(t)}addNewGameListener(t){this.newGameListeners.push(t)}addSaveGameListener(t){this.saveGameListeners.push(t)}addLoadGameListener(t){this.loadGameListeners.push(t)}onCellEnter(t){t.preventDefault();const e=this.cells.indexOf(t.currentTarget);this.cellEnterListeners.forEach((t=>t.call(null,e)))}onCellLeave(t){t.preventDefault();const e=this.cells.indexOf(t.currentTarget);this.cellLeaveListeners.forEach((t=>t.call(null,e)))}onCellClick(t){const e=this.cells.indexOf(t.currentTarget);this.cellClickListeners.forEach((t=>t.call(null,e)))}onNewGameClick(t){t.preventDefault(),this.newGameListeners.forEach((t=>t.call(null)))}onSaveGameClick(t){t.preventDefault(),this.saveGameListeners.forEach((t=>t.call(null)))}onLoadGameClick(t){t.preventDefault(),this.loadGameListeners.forEach((t=>t.call(null)))}showError(t){return new Promise((e=>{const a=this.container.querySelector("[id-data=message]");a.textContent=t,a.classList.add("message-error"),a.classList.remove("hidden-item"),setTimeout((()=>{e(a.classList.add("hidden-item"))}),1e3)}))}showMessage(t){return new Promise((e=>{const a=this.container.querySelector("[id-data=message]");a.textContent=t,a.classList.remove("message-error"),a.classList.remove("hidden-item"),setTimeout((()=>{e(a.classList.add("hidden-item"))}),3e3)}))}selectCell(t,e="yellow"){this.deselectCell(t),this.cells[t].classList.add("selected",`selected-${e}`)}deselectCell(t){const e=this.cells[t];e.classList.remove(...Array.from(e.classList).filter((t=>t.startsWith("selected"))))}showCellTooltip(t,e){this.cells[e].title=t}hideCellTooltip(t){this.cells[t].title=""}showDamage(t,e,a,s){return new Promise((i=>{const r=this.cells[a.position],l=document.createElement("span");l.textContent=t,l.classList.add("damage"),r.appendChild(l),l.addEventListener("animationend",(()=>{r.removeChild(l),i(s(t,e,a))}))}))}showCurrentPoints(t){const e=t||0;this.cellCurrentPoints.querySelector("[data-id=points-current-value]").textContent=e}showMaxPoints(t){const e=t?.points||0;this.cellMaxPoints.querySelector("[data-id=points-max-value]").textContent=e}showCellsForMove(t){this.clearCellsForMove();for(let e of t){const t=this.cells[e];t.querySelector(".character")||t.classList.add("move")}}clearCellsForMove(){const t=this.container.querySelectorAll(".move");for(let e of t)e.classList.remove("move")}showCellsForAttack(t,e){this.clearCellsForAttack();for(let a of t){const t=this.cells[a].querySelector(".character");if(t)for(let a of e)t.classList.contains(a.character.type)&&t.classList.add("attack")}}clearCellsForAttack(t){const e=this.container.querySelectorAll(".attack");for(let t of e)t.classList.remove("attack")}setCursor(t){this.boardEl.style.cursor=t}checkBinding(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}};k.bindToDOM(document.querySelector("#game-container"));const b=new class{constructor(t){this.storage=t}save(t){this.storage.setItem("gameState",JSON.stringify(t))}load(){try{return JSON.parse(this.storage.getItem("gameState"))}catch(t){throw new Error("Invalid state")}}}(localStorage);new L(k,b).init()}();