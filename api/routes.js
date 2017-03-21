import express, { Router } from 'express';

const router = new Router();

router.use('/member', require('./routes/member'));
router.use('/award', require('./routes/award'));

router.use('*', (req, res) => {
    res.status(404);
    res.send('NOT_FOUND');
    res.end();
});

export default router;