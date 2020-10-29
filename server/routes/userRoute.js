const { Router } = require('express');
const { User, Interaction} = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allUsers = await User.findAll({
    include: [{ model: Interaction }]
  });
    res.json(allUsers);
});

router.get('/:userId', async (req, res) => {
  const user = await User.findByPk(req.params.userId , {
    include: [{ model: Interaction }]
  });
  res.json(song)
})

router.post('/', async (req, res) => {
    const { name, email, password, isAdmin = false, preferences, rememberToken } = req.body;
    const user = await User.create({
        name: name, 
        email: email, 
        password: password, 
        isAdmin: isAdmin, 
        preferences: preferences, 
        rememberToken: rememberToken,
        createdAt: req.body.createdAt || new Date(), 
        updatedAt: new Date()
    });
  res.json(user)
})

router.patch('/:userId', async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  await user.update(req.body);
  res.json(user)
})

router.delete('/:userId', async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  await user.destroy();
  res.json({ deleted: true })
})

module.exports = router;