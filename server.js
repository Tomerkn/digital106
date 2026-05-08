import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Helper to generate a UUID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Mock FHIR Transformation Logic
function transformToFHIR(patientData) {
  const fhirBundle = {
    resourceType: "Bundle",
    type: "transaction",
    entry: [
      {
        resource: {
          resourceType: "Patient",
          id: patientData.patientId || generateId(),
          identifier: [
            {
              system: "http://idf.il/personal-number",
              value: patientData.personalNumber || "Unknown"
            }
          ],
          name: [
            {
              text: patientData.patientId
            }
          ]
        },
        request: {
          method: "POST",
          url: "Patient"
        }
      },
      {
        resource: {
          resourceType: "Encounter",
          id: generateId(),
          status: "in-progress",
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "EMER",
            display: "emergency"
          },
          subject: {
            reference: `Patient/${patientData.patientId}`
          },
          period: {
            start: new Date().toISOString()
          }
        },
        request: {
          method: "POST",
          url: "Encounter"
        }
      }
    ]
  };

  // Add observation for Heart Rate
  if (patientData.vitals && patientData.vitals.hr) {
    fhirBundle.entry.push({
      resource: {
        resourceType: "Observation",
        id: generateId(),
        status: "final",
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "vital-signs",
                display: "Vital Signs"
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "8867-4",
              display: "Heart rate"
            }
          ]
        },
        subject: {
          reference: `Patient/${patientData.patientId}`
        },
        valueQuantity: {
          value: patientData.vitals.hr,
          unit: "beats/minute",
          system: "http://unitsofmeasure.org",
          code: "/min"
        }
      },
      request: {
        method: "POST",
        url: "Observation"
      }
    });
  }

  return fhirBundle;
}

// Endpoint to receive MIST data and sync to EHR
app.post('/api/sync-ehr', (req, res) => {
  try {
    const patientData = req.body;
    console.log(`[Backend] Received sync request for patient: ${patientData.patientId}`);
    
    // 1. Transform JSON to FHIR Bundle
    const fhirPayload = transformToFHIR(patientData);
    console.log('[Backend] Transformed to FHIR Bundle with', fhirPayload.entry.length, 'entries.');

    // 2. Simulate AWS HealthLake API call latency
    setTimeout(() => {
      console.log(`[Backend] Successfully synced FHIR data to AWS HealthLake for ${patientData.patientId}`);
      res.json({ 
        success: true, 
        message: 'הנתונים סונכרנו בהצלחה לתיק הרפואי בתקן FHIR',
        fhirBundleId: generateId(),
        timestamp: new Date().toISOString()
      });
    }, 2500); // 2.5s delay to simulate cloud sync
    
  } catch (error) {
    console.error('[Backend] Sync Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error during EHR Sync' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Tactical Medicine Backend API running on port ${PORT}`);
  console.log(`Ready to accept FHIR syncs from the field.`);
});
