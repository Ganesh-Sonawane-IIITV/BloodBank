import React from 'react'
import { Button } from 'antd'
import InventoryForm from './InventoryForm'

function Inventory() {
    const [open,setOpen] = React.useState(false)
  return (
    <div className='flex justify-end'>
        <Button type="default" onClick={() => setOpen(true)}>
            Add Inventory
        </Button>
      
    
    {open && <InventoryForm open={open} setOpen={setOpen}/>}
    </div>
  )
}

export default Inventory
