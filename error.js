/**
 * Node process
 *  - handle errors not caught or handled elsewhere
 *  - catch all 
 */
process.on('unhandledException', () => {
    console.log('unhandledExcept')
})

process.on('unhandledRejection', () => {
    console.log('unhandledReject')
})