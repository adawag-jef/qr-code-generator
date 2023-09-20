import { Button, Input } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { generate as shortid } from "shortid";
import { v4 as uuidv4 } from 'uuid';
import { getQRCode } from "./util";

export const App = () => {
  const [value, setValue] = useState<{name: string; social: string}>({name: '', social: ''});
  const [qr, setQr] = useState<string>("");
  const [show, setShow] = useState<boolean>(true);

  const generateQRCode = useCallback(() => {
    const data = JSON.stringify({...value, id: uuidv4()})
    const qrValue = getQRCode(data);
    if (!qrValue) return;
    setQr(qrValue);
    setShow(false)
  }, [value, setQr]);

  const downloadFile = useCallback(() => {
    const elm = document.createElement("a");
    elm.href = qr;
    elm.download = shortid();
    elm.click();
    reset()
  }, [qr]);

  const reset = () => { 

    setQr('')
    setValue({name: '', social: ''})
    setShow(true)
   }

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}
    >
      {show && <div style={{display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16}}>
        <Input
          clearable
          rounded
          placeholder="Name"
          color="primary"
          value={value.name}
          onChange={(e) => setValue(prev => ({...prev, name: e.target.value}))}
          size="lg"
        />
        <Input
          clearable
          rounded
          placeholder="Social"
          color="primary"
          value={value.social}
          onChange={(e) => setValue(prev => ({...prev, social: e.target.value}))}
          size="lg"
        />
        <Button onClick={generateQRCode} shadow size="lg" disabled={!value.name || !value.social}>
          Generate
        </Button>
      </div>}

      {qr && (
        <div>
          <div>
            <img src={qr} />
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, flexDirection: 'column'}}>
            <Button onClick={downloadFile} color="success" shadow size="lg">
              Download
            </Button>
            <Button onClick={reset} color="warning" shadow size="lg">
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
