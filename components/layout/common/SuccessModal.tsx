// src/components/layout/common/SuccessModal.tsx

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-900 p-8 text-left align-middle shadow-xl transition-all border border-slate-800">
                <div className="absolute top-4 right-4">
                  <button
                    type="button"
                    className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                    onClick={onClose}
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 border-2 border-green-500">
                     <CheckCircle className="text-green-400" size={40} />
                  </div>
                  
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-white">
                    Thank You!
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-slate-400">
                      Your enquiry has been submitted successfully. You can now download the brochure and watch the course videos.
                    </p>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-xl border border-transparent bg-primary-600 px-6 py-3 text-sm font-bold text-white hover:bg-primary-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                      onClick={onClose}
                    >
                      Awesome!
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};