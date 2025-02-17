import { TextField } from '@mui/material'
import { useState } from 'react'
import CenteredModal from '../Modal/CenteredModal'

interface AddTicketModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

const AddTicketModal = (props: AddTicketModalProps) => {
    const { onSubmit, onClose, show } = props

    const [isLoading, setIsLoading] = useState(false)

    const [input, setInput] = useState({
        title: "",
        description: "",
        status: "OPEN",
        priority: 2,
        authorId: 1,
        internal: true
    })

    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
    };

    const handleChangeInt = (e: any) => {
        setInput(({ ...input, [e.target.name]: Number(e.target.value) }))
    };

    const generateTicketUsingAPI = async () => {
        const response = await fetch(`${process.env.REACT_APP_SUPPORT_API || 'http://localhost:4000'}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        return response
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const response = await generateTicketUsingAPI()
        setIsLoading(false)
        if (response.status === 200) {
            onSubmit()
        }
    }

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Agregar Ticket" addbuttonLabel="Agregar">
            <div className='flex mb-6 flex-row'>
                <TextField id="outlined-basic" name="title" className='mr-8 w-80' label="Titulo" InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
                <TextField id="outlined-basic" name="priority" className='mr-8 w-80' label="Prioridad" type="number" InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeInt} />
            </div>
            <div className='flex mb-6 flex-row'>
                <TextField id="outlined-basic" name="productId" className='mr-8 w-80' label="Producto" InputLabelProps={{ shrink: true }} variant="outlined" />
                <TextField id="outlined-basic" name="productVersion" className='mr-8 w-80' label="Version" InputLabelProps={{ shrink: true }} variant="outlined" />
            </div>
            <TextField id="outlined-basic" className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" multiline rows={2} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
        </CenteredModal>
    )
}

export default AddTicketModal
