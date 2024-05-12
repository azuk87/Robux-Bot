const { EventBuilder } = require('handler.djs');

EventBuilder.$N`ready`.$E(client => {
    console.log(`Client Is Ready: (${client.user.username})`);
}).$O().$L();