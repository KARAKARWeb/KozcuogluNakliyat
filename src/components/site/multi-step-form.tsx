"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Check, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useFormValidation, validators } from "@/hooks/use-form-validation";

interface FormStep {
  id: string;
  title: string;
  description: string;
}

const steps: FormStep[] = [
  { id: "personal", title: "Kişisel Bilgiler", description: "Adınız ve iletişim bilgileriniz" },
  { id: "service", title: "Hizmet Detayları", description: "Taşıma detaylarınız" },
  { id: "additional", title: "Ek Bilgiler", description: "Özel talepleriniz" },
  { id: "files", title: "Dosyalar", description: "Fotoğraf veya belgeler" },
];

export function MultiStepContactForm({ onSubmit }: { onSubmit: (data: any) => Promise<void> }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  const { values, errors, touched, handleChange, handleBlur, validateAll, setValues } =
    useFormValidation(
      {
        name: "",
        email: "",
        phone: "",
        fromAddress: "",
        toAddress: "",
        serviceType: "",
        movingDate: "",
        message: "",
      },
      {
        name: [validators.required()],
        email: [validators.required(), validators.email()],
        phone: [validators.required(), validators.phone()],
        fromAddress: [validators.required()],
        toAddress: [validators.required()],
        serviceType: [validators.required()],
      }
    );

  // Auto-save to localStorage
  useEffect(() => {
    if (autoSaveEnabled) {
      const timer = setTimeout(() => {
        localStorage.setItem("contactFormDraft", JSON.stringify(values));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [values, autoSaveEnabled]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("contactFormDraft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setValues(parsed);
      } catch (error) {
        console.error("Failed to load saved form:", error);
      }
    }
  }, []);

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmitForm = async () => {
    if (!validateAll()) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ ...values, files });
      localStorage.removeItem("contactFormDraft");
      // Success state handled by parent
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${
                index <= currentStep ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  index < currentStep
                    ? "border-primary bg-primary text-white"
                    : index === currentStep
                    ? "border-primary bg-white text-primary"
                    : "border-gray-300 bg-white"
                }`}
              >
                {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span className="ml-2 hidden sm:inline text-sm font-medium">
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-2">{steps[currentStep].title}</h2>
        <p className="text-sm text-muted-foreground mb-6">
          {steps[currentStep].description}
        </p>

        <div className="space-y-4">
          {/* Step 1: Personal Info */}
          {currentStep === 0 && (
            <>
              <div>
                <Label htmlFor="name">Adınız Soyadınız *</Label>
                <Input
                  id="name"
                  value={values.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={errors.name && touched.name ? "border-red-500" : ""}
                />
                {errors.name && touched.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">E-posta *</Label>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={errors.email && touched.email ? "border-red-500" : ""}
                />
                {errors.email && touched.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Telefon *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={values.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  className={errors.phone && touched.phone ? "border-red-500" : ""}
                />
                {errors.phone && touched.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </>
          )}

          {/* Step 2: Service Details */}
          {currentStep === 1 && (
            <>
              <div>
                <Label htmlFor="fromAddress">Nereden *</Label>
                <Input
                  id="fromAddress"
                  value={values.fromAddress}
                  onChange={(e) => handleChange("fromAddress", e.target.value)}
                  onBlur={() => handleBlur("fromAddress")}
                  placeholder="Mevcut adresiniz"
                />
              </div>

              <div>
                <Label htmlFor="toAddress">Nereye *</Label>
                <Input
                  id="toAddress"
                  value={values.toAddress}
                  onChange={(e) => handleChange("toAddress", e.target.value)}
                  onBlur={() => handleBlur("toAddress")}
                  placeholder="Taşınacak adres"
                />
              </div>

              <div>
                <Label htmlFor="serviceType">Hizmet Türü *</Label>
                <select
                  id="serviceType"
                  value={values.serviceType}
                  onChange={(e) => handleChange("serviceType", e.target.value)}
                  className="w-full rounded-md border px-3 py-2"
                >
                  <option value="">Seçiniz</option>
                  <option value="ev">Ev Taşıma</option>
                  <option value="ofis">Ofis Taşıma</option>
                  <option value="sehirlerarasi">Şehirler Arası</option>
                </select>
              </div>

              <div>
                <Label htmlFor="movingDate">Taşınma Tarihi</Label>
                <Input
                  id="movingDate"
                  type="date"
                  value={values.movingDate}
                  onChange={(e) => handleChange("movingDate", e.target.value)}
                />
              </div>
            </>
          )}

          {/* Step 3: Additional Info */}
          {currentStep === 2 && (
            <div>
              <Label htmlFor="message">Ek Notlar</Label>
              <Textarea
                id="message"
                value={values.message}
                onChange={(e) => handleChange("message", e.target.value)}
                rows={6}
                placeholder="Özel talepleriniz veya sorularınız..."
              />
            </div>
          )}

          {/* Step 4: File Upload */}
          {currentStep === 3 && (
            <div>
              <Label>Dosya Yükle (Opsiyonel)</Label>
              <div className="mt-2 space-y-3">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Dosya seçin</span> veya sürükleyin
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF (max. 10MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <span className="text-sm truncate">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Auto-save indicator */}
        {autoSaveEnabled && (
          <p className="text-xs text-muted-foreground mt-4">
            ✓ Formunuz otomatik olarak kaydediliyor
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext}>
            İleri
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmitForm} disabled={submitting}>
            {submitting ? "Gönderiliyor..." : "Gönder"}
          </Button>
        )}
      </div>
    </div>
  );
}
