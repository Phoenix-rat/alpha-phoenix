const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./config.json');
const moment = require('moment');
const fs = require('fs');
const db = require('quick.db');

var prefix = ayarlar.prefix;


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const lazefe = fs.readdirSync('./komutlar').filter(f => f.endsWith('.js'))
    for(const f of lazefe){
        let efebeyS = require(`./komutlar/${f}`)
        if(efebeyS.help.name){
          console.log(`Yüklenen Komut => ${efebeyS.help.name}`)
            client.commands.set(efebeyS.help.name, efebeyS)
        }
    efebeyS.conf.aliases.forEach(alias => {
        client.aliases.set(alias, efebeyS.help.name)
    })
}

client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};


client.on("ready", () => {
	client.user.setStatus("online");
	console.log("Bot aktif | Tüm komutlar yüklendi.")
	client.user.setActivity("Alpha Phoenix | !yardım", {type: "WATCHING"});
})

client.login(ayarlar.token)