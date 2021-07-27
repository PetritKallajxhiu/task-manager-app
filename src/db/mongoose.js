const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false // Qe te heqi warning
    //useCreateIndex: true -> Removed in the new version
})

