import React, { useState } from 'react'
import GeneralDrawer from '../../../../components/GeneralDrawer/GeneralDrawer'
import InputWithMeta from '../../../../components/GeneralDrawer/InputWithMeta'

export default function AddSurgeryDrawer({ open, onClose, onSave }) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleSave = () => {
        if (!name.trim()) return; // Validation
        onSave({ name, description });
        // Reset and close
        setName('');
        setDescription('');
        onClose();
    }

    return (
        <GeneralDrawer
            isOpen={open}
            onClose={onClose}
            title="Create New Surgery"
            primaryActionLabel="Create"
            width={600}
            onPrimaryAction={handleSave}
            primaryActionDisabled={!name.trim()}
        >
            <div className="flex flex-col gap-5">
                <InputWithMeta
                    label="Surgery Name"
                    requiredDot={true}
                    value={name}
                    onChange={setName}
                    placeholder="Enter surgery name"
                    inputRightMeta={
                        <div className='text-secondary-grey150'>
                            {name.length}/250
                        </div>
                    }
                />

                <InputWithMeta
                    label="Description"
                    showInput={false}
                >
                    <textarea
                        className="w-full rounded-sm border-[0.5px] border-secondary-grey200 p-2 h-32 text-sm text-secondary-grey400 focus:outline-none focus:ring-0 focus:border-blue-primary150 focus:border-[2px] placeholder:text-secondary-grey100 resize-none"
                        placeholder="Describe the role"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </InputWithMeta>
            </div>
        </GeneralDrawer>
    )
}
