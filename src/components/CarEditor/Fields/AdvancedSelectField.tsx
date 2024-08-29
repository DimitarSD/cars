import React, { useState, useRef, useEffect } from 'react'
import { useField } from 'formik'
import EditDeletePopup from '../EditDeletePopup'
import {
  AdvancedSelectFieldProps,
  Option,
} from '../../../types/componentsTypes/CarEditorTypes/FieldsTypes/AdvancedSelectFieldProps'
import Label from '../../atoms/Label'
import DropdownButton from '../../atoms/DropdownButton'
import EditButton from '../../atoms/EditButton'
import { DropdownMenu } from './../DropdownMenu'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

const AdvancedSelectField = ({
  name,
  label,
  options,
  onEdit,
  onDelete,
  onChange,
  onCreate,
  setFieldValue,
  disabled,
  isModification = false,
}: AdvancedSelectFieldProps) => {
  const [field, meta, helpers] = useField(name)
  const [isOpen, setIsOpen] = useState(false)
  const [editValue, setEditValue] = useState('')
  const [editHorsePower, setEditHorsePower] = useState('')
  const [showEditDeletePopup, setShowEditDeletePopup] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useOutsideClick(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false)
    }
  })

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
    setSearchTerm('') 
  }

  const handleSelect = (option: Option) => {
    helpers.setValue(option.value)
    setIsOpen(false)
    if (onChange) {
      onChange(option.value)
    }
  }

  const handleCreateNew = async () => {
    if (onCreate && searchTerm) {
      await onCreate(searchTerm, setFieldValue)
      setIsOpen(false)
    }
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = async () => {
    if (field.value) {
      if (isModification) {
        await onEdit(field.value, editValue, parseInt(editHorsePower))
      } else {
        await onEdit(field.value, editValue)
      }
      setShowEditDeletePopup(false)
    }
  }

  const handleDelete = async () => {
    let confirmationMessage = ''

    if (label.toLowerCase() === 'brand') {
      confirmationMessage = `Are you sure you want to delete this ${label.toLowerCase()}? This will also delete all models associated with this brand and all modifications associated with those models.`
    } else if (label.toLowerCase() === 'model') {
      confirmationMessage = `Are you sure you want to delete this ${label.toLowerCase()}? This will also delete all modifications associated with this model.`
    } else if (label.toLowerCase() === 'modification') {
      confirmationMessage = `Are you sure you want to delete this ${label.toLowerCase()}? This will only delete this specific modification.`
    } else {
      confirmationMessage = `Are you sure you want to delete this ${label.toLowerCase()}?`
    }

    if (field.value && window.confirm(confirmationMessage)) {
      await onDelete(field.value)
      helpers.setValue('')
      setShowEditDeletePopup(false)
      if (onChange) {
        onChange('')
      }
    }
  }

  const openEditDeletePopup = () => {
    const selectedOption = options.find(
      (option) => option.value === field.value
    )
    if (selectedOption) {
      setEditValue(selectedOption.label)
      if (isModification && selectedOption.horsePower !== undefined) {
        setEditHorsePower(selectedOption.horsePower.toString())
      }
      setShowEditDeletePopup(true)
    }
  }

  const selectedOption = options.find((option) => option.value === field.value)

  return (
    <div className="relative" ref={dropdownRef}>
      <Label htmlFor={name} text={label} />
      <div className="mt-1 relative">
        <DropdownButton
          onClick={toggleDropdown}
          text={selectedOption ? selectedOption.label : `Select ${label}`}
          disabled={disabled}
        />
        {selectedOption && <EditButton onClick={openEditDeletePopup} />}
      </div>
      {isOpen && (
        <DropdownMenu
          searchTerm={searchTerm}
          label={label}
          filteredOptions={filteredOptions}
          handleSelect={handleSelect}
          handleCreateNew={handleCreateNew}
          setSearchTerm={setSearchTerm}
        />
      )}
      {showEditDeletePopup && (
        <EditDeletePopup
          label={label}
          name={name}
          editValue={editValue}
          setEditValue={setEditValue}
          isModification={isModification}
          editHorsePower={editHorsePower}
          setEditHorsePower={setEditHorsePower}
          onClose={() => setShowEditDeletePopup(false)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default AdvancedSelectField
