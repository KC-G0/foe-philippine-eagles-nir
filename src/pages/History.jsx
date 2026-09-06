// src/pages/History.jsx
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import BookViewer from '../components/BookViewer'
import Icon from '../components/Icons'

export default function History() {
  const { user } = useAuth()

  return (
    <div className="py-16 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-gold-500 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          History & Constitution
        </motion.h1>

        {/* Public History Content */}
        <motion.div 
          className="glass-panel p-8 mb-12 border border-gold-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gold-500 mb-6">Our History</h2>
          <div className="text-white/80 space-y-6">
            <p className="leading-relaxed">
              The Fraternal Order of Eagles - Philippine Eagles, Incorporated (TFOE-PE, Inc.) was founded on 
              <span className="text-gold-500 font-semibold"> June 22, 1979</span> at the UP Asian Institute of Tourism, 
              Diliman, Quezon City.
            </p>
            <p className="leading-relaxed">
              The original declaration of objectives was signed by the Founding Fathers on June 28, 1979 at the 
              UP Asian Institute of Tourism, Diliman, Quezon City.
            </p>
            <p className="leading-relaxed">
              The organization was duly registered with the Securities and Exchange Commission (SEC) under 
              SEC Registration No. CN 2017-21277 as a non-stock corporation.
            </p>
            <p className="leading-relaxed">
              The 1989 Magna Carta was created on May 27, 1989 at UP AIT, Diliman, Quezon City under the 
              Philippine Eagles Institute of Leadership Act of 1989. Said Act was amended in 2008 and further 
              amended by the 2024 Rules.
            </p>
            <p className="leading-relaxed">
              The Philippine Eagles Constitution of 2024 was published and edited by the Philippine Eagles 
              Constitutional Commission (PECC), led by Co-Chairmen Eagle Jason Almond De Guzman and 
              Eagle Rodelio T. Dascil.
            </p>
          </div>
        </motion.div>

        {/* Constitution Book Viewer - Gated */}
        <div className="glass-panel p-8 border border-gold-500/20">
          <h2 className="text-2xl font-bold text-gold-500 mb-6">Constitution Book</h2>
          
          {user ? (
            <BookViewer />
          ) : (
            <div className="text-center py-16">
              <div className="mb-6 flex justify-center">
                <Icon name="Lock" size={64} />
              </div>
              <h3 className="text-xl font-bold text-gold-500 mb-2">Members Only</h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Please log in to view the full constitution document.
              </p>
              <a href="/login-page" className="btn-gold inline-block">
                Log In to Read the Constitution
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
