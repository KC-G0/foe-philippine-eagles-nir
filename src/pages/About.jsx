// src/pages/About.jsx
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="py-16 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-gold-500 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About the Fraternity
        </motion.h1>
        
        <motion.div 
          className="glass-panel p-8 space-y-8 border border-gold-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <h2 className="text-2xl font-bold text-gold-500 mb-4">Our Identity</h2>
            <p className="text-white/80 leading-relaxed">
              We, Eagle-members of The Fraternal Order of Eagles - Philippine Eagles, Incorporated (TFOE-PE, Inc.), 
              united by a unique bond of communal fraternal organization and anchored on Four (4) Pillars of Eagleism — 
              Brotherhood, Service, Unity and Divine Power with the guiding principles of "Service Through Strong Brotherhood" 
              and Deo et Patria which means for God and Country — form a strong, first Philippine born fraternal socio-civic 
              organization that will serve a Supreme Being and cares for humanity at all times.
            </p>
          </div>

          <div className="section-divider" />

          <div>
            <h2 className="text-2xl font-bold text-gold-500 mb-4">Name and Declaration</h2>
            <p className="text-white/80 leading-relaxed">
              We shall call ourselves the Philippine Eagles and shall name our Fraternity as The Fraternal Order of 
              Eagles - Philippine Eagles, Incorporated (TFOE-PE, Inc.) or briefly, the Philippine Eagles.
            </p>
          </div>

          <div className="section-divider" />

          <div>
            <h2 className="text-2xl font-bold text-gold-500 mb-4">Declaration of Principles</h2>
            <p className="text-white/80 leading-relaxed">
              The guiding principles of the Philippine Eagles shall be: "Service Through Strong Brotherhood" and 
              <span className="text-gold-500 font-semibold"> DEO ET PATRIA which means FOR GOD AND COUNTRY</span>
            </p>
          </div>

          <div className="section-divider" />

          <div>
            <h2 className="text-2xl font-bold text-gold-500 mb-4">The Eagle</h2>
            <p className="text-white/80 leading-relaxed">
              The Eagle is a large specie of bird and regarded as a symbol of bold strength and courageous character. 
              It is noted for its majestic and noble qualities and keen and bright foresight. An Eagle who is humanitarian 
              shall be endowed with the above qualities. He shall render personal service to his fellowmen and community 
              with dignity and nobility.
            </p>
          </div>

          <div className="section-divider" />

          <div>
            <h2 className="text-2xl font-bold text-gold-500 mb-4">Eagleism</h2>
            <p className="text-white/80 leading-relaxed">
              Eagleism is unique and peculiar to the Philippine Eagles. Based on the 1989 Magna Carta, Eagleism has 
              genuinely evolved as Fraternalism — the fraternal "ism" in the Philippine Eagles has sprung from its 
              declaration of policies and objectives seeking to form a strong, first Philippine born fraternal socio-civic 
              organization.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
