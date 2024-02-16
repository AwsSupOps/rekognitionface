import React from 'react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { ToggleButtonGroup, ToggleButton ,ThemeProvider, Loader } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsexports from './aws-exports';
Amplify.configure(awsexports);

const dictionary = {
  // use default strings for english
  en: null,
  es: {
    photosensitivyWarningHeadingText: 'Advertencia de fotosensibilidad',
    photosensitivyWarningBodyText:
      'Esta verificación muestra luces de colores. Tenga cuidado si es fotosensible.',
    goodFitCaptionText: 'Buen ajuste',
    tooFarCaptionText: 'Demasiado lejos',
    hintCenterFaceText: 'Centra tu cara',
    startScreenBeginCheckText: 'Comenzar a verificar',
  },
};



 function LivenessQuickStartReact() {
  const [language, setLanguage] = React.useState<string>('en');
  const [loading, setLoading] = React.useState(true);
  const [createLivenessApiData, setCreateLivenessApiData] =
    React.useState(null);

  React.useEffect(() => {
    const fetchCreateLiveness = async () => {
      /*
       * This should be replaced with a real call to your own backend API
       */
      await new Promise((r) => setTimeout(r, 2000));
      const mockResponse = { sessionId: 'mockSessionId' };
      const data = mockResponse;

      setCreateLivenessApiData(data);
      setLoading(false);
    };

    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    /*
     * This should be replaced with a real call to your own backend API
     */
    const response = await fetch(
      `/api/get?sessionId=${createLivenessApiData.sessionId}`
    );
    const data = await response.json();

    /*
     * Note: The isLive flag is not returned from the GetFaceLivenessSession API
     * This should be returned from your backend based on the score that you
     * get in response. Based on the return value of your API you can determine what to render next.
     * Any next steps from an authorization perspective should happen in your backend and you should not rely
     * on this value for any auth related decisions.
     */
    if (data.isLive) {
      console.log('User is live');
    } else {
      console.log('User is not live');
    }
  };

  return (
    <ThemeProvider>
    
     <ToggleButtonGroup
        value={language}
        isExclusive
        onChange={(value) => setLanguage(value)}
      >
        <ToggleButton value="en">En</ToggleButton>
        <ToggleButton value="es">Es</ToggleButton>
      </ToggleButtonGroup>
      
      {loading ? (
        <Loader />
      ) : (
        <FaceLivenessDetector
          sessionId={createLivenessApiData.sessionId}
          region="us-east-1"
          onAnalysisComplete={handleAnalysisComplete}
          onError={(error) => {
            console.error(error);
          }}
          displayText={dictionary['es']}
        />
      )}
    </ThemeProvider>
  );
}
export default LivenessQuickStartReact
