
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function InfluencersContainer() {
  const { t } = useTranslation();
  
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden items-end justify-end">
      
       <div className="flex w-full h-full flex-col gap-8 justify-end items-end px-8 py-8 ">   
                    <motion.div
                      className={`flex flex-col items-start justify-start w-full text-left gap-4`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-3xl font-bold text-[#F2F2F2]  tracking-wide">
                          {t('bio.team')}
                        </h1>
                          
                    </motion.div>
                    <div className="flex flex-row justify-start items-start w-full relative">
                    <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full max-w-72 h-[3px] bg-[#C4A574] origin-left"
                          />
                          </div>
                   
            </div>

    

         </div>
  );
}
