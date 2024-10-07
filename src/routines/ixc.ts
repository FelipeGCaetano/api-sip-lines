import cron from 'node-cron'
import { IxcUseCase } from '@/http/services/ixc.service'
import fetch from 'node-fetch'

cron.schedule('0 * * * *', async () => {
    console.log("Executando verificação de O.S")
    const ixc = new IxcUseCase()

    const getOs = ixc.checkSipOS()

    const opt = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(getOs)
    }

    await fetch("http://10.0.30.221:6162/portability/api/hook/create", opt)
})