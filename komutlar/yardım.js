const Discord = require('discord.js');
const ayarlar = require('../config.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
  const msg = new Discord.MessageEmbed()
  .setTitle("Yardım Paneli")
  .setColor("GREEN")
  .setDescription(`**${prefix}ticket-kanal =>** Ticketin gönderileceği kanalı ayarlar.\n 
**${prefix}ticket-mesaj =>** Ticket mesajını ayarlar.\n
**${prefix}ticket-yetkili-rol =>** Ticket yetkili rolü ayarlar.\n
**${prefix}ping =>** Pingi gösterir.\n
**${prefix}gönder =>** Ticketi gönderir.`)
message.channel.send(msg)
  }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'yardım'
}