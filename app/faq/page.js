/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function Faq() {
  return (
    <div className='isolate bg-white px-6 pb-24 pt-14 sm:pb-32 sm:pt-20 lg:px-8'>
      <div
        className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'
        aria-hidden='true'
      >
        <div
          className='relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className='mx-auto max-w-2xl text-center'>
        <h2 className='text-2xl uppercase font-bold tracking-tight text-slate-900 sm:text-3xl'>
          Formulaire de recrutement
        </h2>

        <p className='mt-4 uppercase leading-8 text-slate-600'>
          Année universitaire 2023-2024
        </p>
        <h3 className='text-xl mt-16 uppercase font-bold drop-shadow-xl text-slate-700 sm:text-2xl'>
          Foire aux questions
        </h3>
        <p className='mt-10 text-center leading-8 text-slate-950'></p>
        <p className='mt-4 text-sm text-justify leading-8 text-slate-950'>
          Vous pouvez consulter nos deux vidéos tutorielles ci-dessous pour vous
          aider à remplir le formulaire :
        </p>
        <ul className='list-disc ml-5 mt-2 text-sm text-justify leading-8 text-slate-950'>
          <li className=''>
            <a
              className='text-blue-500 hover:underline'
              href='https://youtu.be/Wu0wgAzpJYw'
              target='_blank'
            >
              Comment remplir le formulaire pour les enseignants vacataires
            </a>
          </li>
          <li className=''>
            <a
              className='text-blue-500 hover:underline'
              href='https://youtu.be/YXMJcohpxyw'
              target='_blank'
            >
              Comment remplir le formulaire pour les conférenciers
            </a>
          </li>
        </ul>
        <p className='mt-4 text-sm text-justify leading-8 text-slate-950'>
          Vous trouverez ci-dessous le dossier de recrutement au format vierge,
          si jamais vous préférez remplir le formulaire manuellement :
        </p>
        <ul className='list-disc ml-5 mt-2 text-sm text-justify leading-8 text-slate-950'>
          <li className=''>
            <a
              className='text-blue-500 hover:underline'
              href='/formulaire-vacataire.pdf'
              target='_blank'
            >
              Pour les enseignants vacataires
            </a>
          </li>
          <li className=''>
            <a
              className='text-blue-500 hover:underline'
              href='/formulaire-conferencier.pdf'
              target='_blank'
            >
              Pour les conférenciers
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
