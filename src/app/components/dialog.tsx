'use client';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

export default function FormDialog({
  open,
  handleClose,
  data,
  handleChange,
  handleFormSubmit,
  showError,
}) {
  const { id, date, product_name, color, amount, unit } = data;
  return (
    <Dialog open={open} onClose={handleClose} className='relative z-10'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'
          >
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div>
                <div className='mt-3 text-center sm:mx-4 sm:mt-0 sm:text-left'>
                  <DialogTitle
                    as='h3'
                    className='text-base font-semibold text-gray-900'
                  >
                    {id ? 'Update fruit' : 'Add new fruit'}
                  </DialogTitle>

                  {showError && (
                    <div className='w-fit text-sm text-red-500 py-2 rounded-md mt-2'>
                      {showError}
                    </div>
                  )}

                  <div className='mt-2'>
                    <form>
                      <div className='grid gap-4 mt-4 mb-4 grid-cols-2'>
                        {/* Date */}
                        <div className='col-span-2'>
                          <label
                            htmlFor='date'
                            className='block mb-2 text-sm font-medium text-gray-900'
                          >
                            Date
                          </label>
                          <input
                            type='date'
                            name='date'
                            id='date'
                            className='bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 valid:text-black'
                            placeholder='Type product name'
                            value={date}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>

                        {/* Product Name */}
                        <div>
                          <label
                            htmlFor='product_name'
                            className='block mb-2 text-sm font-medium text-gray-900'
                          >
                            Product Name
                          </label>
                          <select
                            name='product_name'
                            id='product_name'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                            value={product_name}
                            onChange={(e) => handleChange(e)}
                            required
                          >
                            <option value='' disabled>
                              Select a product
                            </option>
                            <option value='Banana'>Banana</option>
                            <option value='Cherry'>Cherry</option>
                            <option value='Apple'>Apple</option>
                            <option value='Orange'>Orange</option>
                            <option value='Watermelon'>Watermelon</option>
                            <option value='Mango'>Mango</option>
                            <option value='Grapes'>Grapes</option>
                            <option value='Strawberry'>Strawberry</option>
                            <option value='Peach'>Peach</option>
                            <option value='Pineapple'>Pineapple</option>
                          </select>
                        </div>

                        {/* Color */}
                        <div>
                          <label
                            htmlFor='color'
                            className='block mb-2 text-sm font-medium text-gray-900'
                          >
                            Color
                          </label>
                          <input
                            type='text'
                            name='color'
                            id='color'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                            placeholder='Type color'
                            value={color}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>

                        {/* Amount */}
                        <div>
                          <label
                            htmlFor='amount'
                            className='block mb-2 text-sm font-medium text-gray-900'
                          >
                            Amount
                          </label>
                          <input
                            type='text'
                            name='amount'
                            id='amount'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                            placeholder='0.00'
                            value={amount}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>

                        {/* Unit */}
                        <div>
                          <label
                            htmlFor='unit'
                            className='block mb-2 text-sm font-medium text-gray-900'
                          >
                            Unit
                          </label>
                          <input
                            type='text'
                            name='unit'
                            id='unit'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                            placeholder='0'
                            value={unit}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto'
                onClick={() => handleFormSubmit()}
              >
                {id ? 'Update' : 'Submit'}
              </button>
              <button
                type='button'
                data-autofocus
                onClick={handleClose}
                className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
