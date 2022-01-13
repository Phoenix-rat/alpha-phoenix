const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");

exports.run = async (client, message, args) => {
  try {
	 if(message.author.id !== "785054250677960737") return message.reply(`yetersiz yetki`)
    var code = args.join(" ");
    var evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    let start = process.hrtime();
    await message.channel.send(clean(evaled));
    let end = process.hrtime(start);
    message.channel.send(
      `${
        end[0] ? `${end[0]} saniye ` : `${end[1] / 1000000} millisaniye `
      } içinde komut çalıştırıldı.`
    );
  } catch (err) {
    message.channel.send(`**Hata Çıktı;**\n\n\`${clean(err)}\``);
  }
  function clean(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0//böyle bi perm level sistemi yoksa üstteki if li yeri açın
};

exports.help = {
  name: "eval",
  description: "Kod denemek için kullanılır.",
  usage: "eval [kod]"
};