#!/usr/bin/env node
const Discordjs = require('discord.js');
const Client = new Discordjs.Client();
const fs = require('fs');
const settings = require("./settings");

console.log("Preparing...");
Client.login(settings.token);
Client.on("ready", () => {
    console.log("Logged in");
    Client.on('message', (msg) => {
        if (msg.content.substr(0, settings.banemote.length) === settings.banemote) {
            lmsg = (msg.content.substr(settings.banemote.length)).toLowerCase().trim();
            msgparts = lmsg.split(' ');
            if (msg.guild.available && msg.member.hasPermission('BAN_MEMBERS')) {
                let toban = msg.guild.members.get(msgparts[0].replace(/[\\<>@#&!]/g, ""));
                let secstowait = 10
                if (typeof toban !== typeof undefined) {
                    if (typeof msgparts[1] != typeof undefined && parseInt(msgparts[1]) < 60 * 5) {
                        secstowait = parseInt(msgparts[1]);
                    }
                    msg.channel.send(msgparts[0] + " VOUS VOUS ÊTES ATTIRÉ·E LES FOUDRES DES DIVINITÉS MODÉRATRICES !");
                    if (secstowait !== 0) {
                        msg.channel.send("VOUS AVEZ " + secstowait + " SECONDES POUR DONNER VOS DERNIÈRES PAROLES !");
                        let interval = setInterval(() => {
                            msg.channel.send(secstowait);
                            secstowait--;
                            if (secstowait < 0) {
                                toban.ban();
                                msg.channel.send("GET BANNED", {file: "https://media3.giphy.com/media/2diYvJgLHN5bkqVMuf/giphy.gif"});
                                clearInterval(interval);
                            }
                        }, 1000);
                    } else {
                        toban.ban();
                        msg.channel.send("GET BANNED", {file: "https://media3.giphy.com/media/2diYvJgLHN5bkqVMuf/giphy.gif"});
                    }
                }
            }
        }
    });
});

console.log("Everything is planned");
