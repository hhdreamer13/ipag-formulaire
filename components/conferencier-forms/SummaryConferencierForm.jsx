/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Image from "next/image";
import { useFormState } from "@/utils/FormContext";
import { pdfHandlerConferencier } from "@/utils/pdfHandlerConferencier";
import labels from "@/public/labels";

const SummaryConferencierForm = () => {
  const { formData, handleBack } = useFormState();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [blobURL, setBlobURL] = useState(null);

  const getLabel = (fieldName) => {
    const fieldLabel = labels.find((label) => label.name === fieldName);
    return fieldLabel ? fieldLabel.label : fieldName;
  };

  const handleConfirm = async () => {
    const pdfDoc = await pdfHandlerConferencier(formData);
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const blobURL = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = blobURL;
    link.download = "formulaire-conferencier-rempli.pdf";
    link.click();

    setBlobURL(blobURL);

    setIsConfirmed(true);
  };

  const onHandleBack = () => {
    handleBack();
  };

  return (
    <div>
      {isConfirmed ? (
        <div className='prose mt-16'>
          <h2>Votre PDF a été généré avec succès</h2>
          <a
            href={blobURL}
            download='formulaire-conferencier-rempli.pdf'
            className='hover:text-indigo-500 mt-4 underline hover:underline'
          >
            Cliquez ici si le téléchargement n'a pas commencé automatiquement
          </a>
          <p className='mt-12 text-sm text-justify leading-8 text-slate-950'>
            Vous avez complété le formulaire et votre dossier de recrutement au
            format PDF a été généré avec succès. Il est nécessaire de joindre
            toutes les pièces justificatives, qui sont indiquées dans le
            document PDF et d'envoyer votre dossier complet (dossier de
            recrutement avec toutes les pièces nécessaires) aux adresses mail
            suivantes&nbsp;:
          </p>
          <ul className='list-disc ml-5 mt-2 text-sm text-justify leading-8 text-slate-950'>
            <li className=''>
              <a
                href='mailto:leo.angioletti@u-paris2.fr'
                className='text-blue-500 no-underline hover:underline'
              >
                leo.angioletti@u-paris2.fr
              </a>
            </li>
            <li className=''>
              <a
                href='mailto:marion.doollee@u-paris2.fr'
                className='text-blue-500 no-underline hover:underline'
              >
                marion.doollee@u-paris2.fr
              </a>
            </li>
          </ul>
          <a
            href='/conferencier'
            className='block w-40 no-underline focus:bg-indigo-700 rounded-md bg-indigo-600 px-3.5 py-2.5 mt-10 mx-auto text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Recommencer
          </a>
        </div>
      ) : (
        <div className='prose'>
          <h3 className='mx-auto mt-16 max-w-xl sm:mt-20 text-left'>
            Veuillez vérifier vos informations :
          </h3>
          <div className='mx-auto mt-8 max-w-xl text-left'>
            <table className='table-auto w-full'>
              <tbody>
                {labels.map(({ name, label }) => {
                  const value = formData[name];
                  if (value) {
                    return (
                      <tr key={name} className='border-b border-gray-200'>
                        <td className='py-2 font-semibold text-gray-700'>
                          {label}&nbsp;:
                        </td>
                        <td className='py-2 text-gray-600 items-center flex'>
                          {name === "signature" ? (
                            value ? (
                              <Image
                                src={value}
                                alt='Signature'
                                width={100}
                                height={50}
                              />
                            ) : (
                              <p>Pas de signature</p>
                            )
                          ) : value && typeof value === "object" ? (
                            Object.entries(value).map(
                              ([k, v]) =>
                                v !== false && <div key={k}>{getLabel(k)}</div>
                            )
                          ) : (
                            value
                          )}
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
              </tbody>
            </table>
          </div>
          <div className='mt-14 flex'>
            <button
              type='button'
              onClick={onHandleBack}
              className='block w-40 mx-auto border-2 border-indigo-50 rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-500 shadow-sm hover:bg-indigo-50 focus:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
            >
              Précédent
            </button>
            <button
              onClick={handleConfirm}
              className='block w-40 mx-auto rounded-md focus:bg-indigo-700 bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Confirmer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryConferencierForm;
