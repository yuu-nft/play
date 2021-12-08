/** Connect to Moralis server */
const serverUrl = "https://55csctxgjtk5.usemoralis.com:2053/server";
const appId = "eCng0LLwVqhr9eRPok23CjceyfNl4L9X57JxyVpl";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" })
      console.log(user)
      console.log(user.get('ethAddress'))
   } catch(error) {
     console.log(error)
   }
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
  physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var platforms;

      var player;
      var competitors = {};

      var cursor;

      var jumpHeight = -300;
      var that;

function preload ()
{
  this.load.image('sky', 'assets/BG.png');
  this.load.image('ground', 'assets/Tiles/Tile (2).png');
  this.load.image('dude', 'assets/player.png');
}

function create ()
{
  this.add.image(600, 400, 'sky');
  
  platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(100, 300, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
  
  player = this.physics.add.sprite(500, 550, 'dude');

player.setBounce(0.2);
player.setCollideWorldBounds(true);
  
  this.physics.add.collider(player, platforms);
  
  cursors = this.input.keyboard.createCursorKeys();
  
  player.body.setGravityY(300)

}

function update ()
{
  if (cursors.left.isDown)
{
    player.setVelocityX(-160);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);
}
else
{
    player.setVelocityX(0);
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
}

/** Useful Resources  */

// https://docs.moralis.io/moralis-server/users/crypto-login
// https://docs.moralis.io/moralis-server/getting-started/quick-start#user
// https://docs.moralis.io/moralis-server/users/crypto-login#metamask

/** Moralis Forum */

// https://forum.moralis.io/
