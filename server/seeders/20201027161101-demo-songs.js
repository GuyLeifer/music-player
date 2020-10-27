'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [{
      title: 'American Idiot',
      artistId: 1,
      albumId: 1,
      youtubeLink: 'h6Z5N0Z6zH0',
      length: '02:54',
      trackNumber: 1,
      lyrics: "Don't want a nation under the new mania And can you hear the sound of hysteria? The subliminal mind-fuck America Welcome to a new kind of tension All across the alien nation Where everything isn't meant to be okay Television dreams of tomorrow We're not the ones who're meant to follow For that's enough to argue Well maybe I'm the faggot America I'm not a part of a redneck agenda Now everybody do the propaganda And sing along to the age of paranoia Welcome to a new kind of tension All across the alien nation Where everything isn't meant to be okay Television dreams of tomorrow We're not the ones who're meant to follow For that's enough to argue Don't wanna be an…",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  },
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [{
      title: 'Jesus of Suburbia 1',
      artistId: 1,
      albumId: 1,
      youtubeLink: 'JMcNzjzw63I',
      length: '09:14',
      trackNumber: 2,
      lyrics: "I'm the son of rage and love The Jesus of Suburbia The bible of none of the above On a steady diet of Soda Pop and Ritalin No one ever died for my Sins in hell As far as I can tell At least the ones that I got away with And there's nothing wrong with me This is how I'm supposed to be In a land of make believe That don't believe in me Get my television fix Sitting on my crucifix The living room in my private womb While the Moms and Brads are away To fall in love and fall in debt To alcohol and cigarettes And Mary Jane To keep me insane Doing someone else's cocaine And there's nothing wrong with me This is how I'm supposed to be In a land of make believe That don't believe in me At the center of the earth In the parking lot Of the 7-11 where I was taught The motto was…",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  },
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [{
      title: 'Holiday',
      artistId: 1,
      albumId: 1,
      youtubeLink: 'l2hA8g1cNvQ',
      length: '03:53',
      trackNumber: 3,
      lyrics: "Hear the sound of the falling rain Coming down like an Armageddon flame (hey!) A shame The ones who died without a name Hear the dogs howlin' out of key To a hymn called faith and misery (hey!) And bleed, the company lost the war today I beg to dream and differ from the hollow lies This is the dawning of the rest of our lives On holiday Hear the drum pounding out of time Another protester has crossed the line (hey!) To find, the money's on the other side Can I get another Amen (Amen!) There's a flag wrapped around a score of men (hey!) A gag, A plastic bag on a monument I beg to dream and differ from the hollow lies This is the dawning of the rest of our lives On holiday The representative from California has the floor Sieg Heil to the president gasman Bombs…",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  },
};
