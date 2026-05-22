// Comprehensive RCM Knowledge Base for Rajesh's AI Voice Assistant
// This is the "brain" that makes the assistant knowledgeable about RCM

export const RCM_KNOWLEDGE_BASE = {
  version: "2.0",
  lastUpdated: "2026-05-22",

  // ===== PROFILE =====
  profile: {
    name: "Rajesh Kantubhukta",
    role: "Director of Revenue Cycle Operations",
    company: "Dharma Solutions",
    location: "Hyderabad, India",
    languages: ["English", "Hindi", "Telugu"],
    experience: "16+ years in US Healthcare RCM",
    specializations: [
      "Denial Management & Prevention",
      "Revenue Cycle Optimization",
      "AI-Driven RCM Solutions",
      "Multi-specialty Billing & Coding",
      "Payer Contract Analysis",
      "AR Recovery & Follow-up",
      "Team Leadership (120+ FTEs)",
    ],
    achievements: [
      "$500M+ Annual Revenue Managed",
      "98% Client Retention Rate",
      "$47M+ Denied Revenue Recovered",
      "Reduced Days in A/R from 65 to 42",
      "Founder of Denial Doctor AI Platform",
      "Author of 'The $50K Leak'",
    ],
    communicationStyle: "Professional but warm, data-driven, solution-oriented. Prefers giving specific action items rather than vague advice. Always backs recommendations with numbers.",
    workHours: "9 AM - 7 PM IST (11:30 PM - 9:30 AM EST)",
    personalInfo: {
      from: "Berhampur, Odisha",
      education: "Mechanical Engineering + MBA",
      school: "Sainik School",
      passion: "Building AI solutions that eliminate operational waste in healthcare",
    },
  },

  // ===== COMPREHENSIVE DENIAL CODES =====
  denialCodes: [
    {
      code: "CO-4",
      category: "Contractual Obligation",
      shortDesc: "Code inconsistency between procedure and diagnosis",
      fullDesc: "The procedure code billed is inconsistent with the diagnosis code submitted on the claim. This means the payer has determined that the service provided does not medically justify the diagnosis listed, or the combination of codes violates coding guidelines such as NCCI edits or LCD/NCD requirements. This is one of the most common denials in multi-specialty practices and often results from insufficient documentation supporting medical necessity or incorrect code pairing.",
      rootCause: "Incorrect code pairing, NCCI edit violations, LCD/NCD non-compliance, insufficient documentation of medical necessity, coder unfamiliarity with specialty-specific guidelines, or upcoding attempts that don't match clinical documentation.",
      appealProcess: [
        "Review the claim for code pairing accuracy against NCCI edits",
        "Verify the diagnosis supports the procedure per LCD/NCD guidelines",
        "Obtain additional documentation from the provider if needed",
        "Submit appeal with a corrected claim or additional medical records",
        "Include a letter of medical necessity from the treating physician",
      ],
      turnaround: "30-45 days for first-level appeal",
      successRate: "45-55% with proper documentation",
      documents: ["Medical records", "Letter of medical necessity", "NCCI edit verification", "LCD/NCD reference documentation", "Clinical notes supporting the procedure-diagnosis relationship"],
      commonMistakes: ["Resubmitting the same claim without correcting the code pair", "Not checking NCCI edits before appeal", "Failing to obtain updated clinical documentation", "Missing the appeal deadline"],
      sampleAppeal: "We are appealing the denial of CPT [code] with diagnosis [code]. The clinical documentation supports the medical necessity of this procedure for the diagnosed condition. Per LCD [number], this procedure is covered when the documented diagnosis meets the specified criteria. Enclosed are the complete medical records and a letter of medical necessity from Dr. [name].",
    },
    {
      code: "CO-9",
      category: "Contractual Obligation",
      shortDesc: "Service not covered based on payer policy",
      fullDesc: "The service or procedure is not a covered benefit under the patient's insurance plan. This denial indicates that the specific service falls outside the scope of benefits defined in the payer's contract or the patient's plan document. It differs from CO-50 (non-covered service) in that CO-9 specifically references payer policy limitations rather than statutory exclusions.",
      rootCause: "Service is explicitly excluded from the plan, benefit limitation reached, service requires prior authorization that wasn't obtained, or the service is considered experimental/investigational by the payer.",
      appealProcess: [
        "Verify the patient's benefit coverage for the specific service",
        "Check if prior authorization was required and obtained",
        "Review payer policy documents for coverage criteria",
        "If the service is covered under specific conditions, gather supporting documentation",
        "Submit appeal with evidence that the service meets coverage criteria",
        "Consider a peer-to-peer review request",
      ],
      turnaround: "30-60 days depending on payer",
      successRate: "25-35% (lower because often policy-driven)",
      documents: ["Patient benefit verification", "Prior authorization records", "Payer policy documentation", "Medical necessity documentation", "Peer-reviewed literature for experimental treatments"],
      commonMistakes: ["Not verifying benefits before service delivery", "Confusing CO-9 with patient responsibility transfers", "Missing the peer-to-peer review window", "Not reading the specific policy exclusion language"],
      sampleAppeal: "We respectfully appeal the denial of [service] for patient [name]. Per your policy [reference number], this service is covered when [specific criteria]. The enclosed documentation demonstrates that the patient meets all specified criteria. We request reconsideration based on the complete clinical evidence provided.",
    },
    {
      code: "CO-11",
      category: "Contractual Obligation",
      shortDesc: "Diagnosis inconsistent with procedure",
      fullDesc: "The diagnosis reported does not support the medical necessity for the procedure or service billed. This is a medical necessity denial where the payer has determined that the clinical indication does not justify the service rendered. This denial is closely related to CO-4 but specifically focuses on the diagnosis-procedure relationship rather than coding edits.",
      rootCause: "Incorrect diagnosis selection, unspecified diagnosis codes when specific codes are available, diagnosis doesn't match the clinical scenario, or the coder used a diagnosis that doesn't support the procedure per payer guidelines.",
      appealProcess: [
        "Review the clinical documentation for the correct diagnosis",
        "Determine if a more specific diagnosis code should be used",
        "Obtain an addendum from the provider if documentation is insufficient",
        "Submit corrected claim with appropriate diagnosis codes",
        "If the original diagnosis is correct, appeal with supporting medical literature",
      ],
      turnaround: "30-45 days",
      successRate: "40-50%",
      documents: ["Complete clinical notes", "Provider attestation or addendum", "Medical literature supporting the diagnosis-procedure relationship", "Corrected claim if applicable"],
      commonMistakes: ["Using unspecified diagnosis codes when specific ones are available", "Not getting provider input before appealing", "Resubmitting without any changes", "Ignoring LCD/NCD requirements for the specific diagnosis"],
      sampleAppeal: "We are appealing the denial for patient [name], service date [date]. The diagnosis of [code] is clinically supported by the documentation enclosed. Per LCD [number], this procedure is medically necessary for the diagnosed condition. The treating physician, Dr. [name], has provided an attestation confirming the clinical findings that support this diagnosis and the corresponding procedure.",
    },
    {
      code: "CO-15",
      category: "Contractual Obligation",
      shortDesc: "Authorization/pre-certification required but not obtained",
      fullDesc: "The service requires prior authorization or pre-certification from the payer, and this was not obtained before the service was rendered. This is one of the highest-volume denials in healthcare and represents a significant revenue leakage point. Many organizations lose millions annually to auth-related denials that could have been prevented with proper upfront verification processes.",
      rootCause: "No prior auth obtained, auth obtained for wrong service, auth expired before service date, incorrect auth number submitted on claim, retroactive auth not requested within payer's timeframe, or auth obtained from wrong payer entity.",
      appealProcess: [
        "Determine if retroactive authorization is possible with the payer",
        "Contact the payer immediately to request retroactive auth",
        "Gather all clinical documentation supporting the emergency or urgency",
        "Submit the retroactive auth request with complete clinical records",
        "If retroactive auth is denied, submit a formal appeal with emergency documentation",
        "Request a peer-to-peer review if initial appeal is denied",
      ],
      turnaround: "15-30 days for retroactive auth, 30-60 days for formal appeal",
      successRate: "50-65% for retroactive auth, 30-40% for formal appeal",
      documents: ["Prior authorization request records", "Clinical documentation showing medical necessity", "Emergency/urgency documentation", "Payer auth policy documentation", "Peer-to-peer review notes"],
      commonMistakes: ["Waiting too long to request retroactive auth", "Not documenting the reason for missing the auth", "Assuming all services require auth", "Not verifying auth requirements for each payer"],
      sampleAppeal: "We are requesting retroactive authorization for [service] rendered on [date] to patient [name]. Due to [emergency/urgent clinical circumstances], prior authorization could not be obtained before service delivery. The enclosed clinical documentation from Dr. [name] confirms the medical necessity and urgency of this service. We respectfully request retroactive authorization based on the clinical evidence provided.",
    },
    {
      code: "CO-16",
      category: "Contractual Obligation",
      shortDesc: "Missing or incomplete claim information",
      fullDesc: "The claim is missing required information or contains incomplete data that prevents the payer from processing it. This is a blanket denial code that can cover a wide range of missing elements including missing demographic information, incomplete provider information, missing modifiers, incomplete diagnosis information, or missing supporting documentation. CO-16 is often accompanied by a remark code that specifies exactly what information is missing.",
      rootCause: "Incomplete patient demographic data, missing or invalid provider NPI, missing modifiers, incomplete diagnosis coding, missing referring provider information, missing dates of service, or missing place of service codes.",
      appealProcess: [
        "Review the ERA/EOB for the specific remark code accompanying CO-16",
        "Identify the exact missing or incomplete information",
        "Gather the correct information from clinical or registration records",
        "Submit a corrected claim with all required information",
        "Monitor for timely filing deadlines on the corrected submission",
      ],
      turnaround: "14-30 days for corrected claim",
      successRate: "70-80% (highest success rate when corrected properly)",
      documents: ["Corrected claim form", "Any documentation specified in the remark code", "Updated patient demographic information", "Provider credential verification"],
      commonMistakes: ["Resubmitting without identifying what was missing", "Not reading the remark code for specifics", "Assuming the denial reason without verification", "Missing the corrected claim filing deadline"],
      sampleAppeal: "We are submitting a corrected claim for patient [name], DOS [date]. The original claim was missing [specific information as indicated by remark code]. The corrected claim includes all required information and is being submitted within the timely filing period. Please process at your earliest convenience.",
    },
    {
      code: "CO-18",
      category: "Contractual Obligation",
      shortDesc: "Duplicate claim or service",
      fullDesc: "The claim has been identified as a duplicate of a previously submitted claim for the same patient, same date of service, same provider, and same procedure. This denial can be legitimate (if the claim was actually submitted twice) or erroneous (if the services were distinct but the payer's system flagged them as duplicates). Understanding the distinction is critical for proper appeal.",
      rootCause: "Accidental duplicate submission, same service billed by multiple providers, modifier not applied to distinguish distinct services, same-day services by same provider without proper modifiers, or payer system error in duplicate detection.",
      appealProcess: [
        "Verify if the claim was genuinely submitted more than once",
        "If genuine duplicate, no action needed - check if original was paid",
        "If distinct services, add appropriate modifiers (76, 77, 59, XE/XS/XP/XU)",
        "Submit corrected claim with supporting documentation",
        "If payer error, appeal with proof of distinct services",
      ],
      turnaround: "14-30 days",
      successRate: "60-70% when modifiers are correctly applied",
      documents: ["Original claim details", "Corrected claim with modifiers", "Clinical notes showing distinct services", "Operative reports if applicable"],
      commonMistakes: ["Ignoring the denial assuming it's a legitimate duplicate", "Not using the correct modifier to distinguish services", "Resubmitting without any changes", "Not checking if the original claim was paid"],
      sampleAppeal: "We are appealing the duplicate denial for patient [name], DOS [date]. The services billed are distinct and separately performed. Modifier [76/77/59/XU] has been applied to indicate [repeat procedure by same physician/different physician/distinct procedural service]. Enclosed are the clinical notes documenting the distinct nature of each service.",
    },
    {
      code: "CO-22",
      category: "Contractual Obligation",
      shortDesc: "Coordination of Benefits (COB) issue",
      fullDesc: "This denial indicates a coordination of benefits issue where the patient has coverage under multiple insurance plans and the claim was submitted to the wrong primary payer, or the COB information is incorrect. Proper COB handling requires identifying the correct order of payer responsibility based on COB rules (birthday rule for dependents, employment status for adults, etc.).",
      rootCause: "Wrong payer billed as primary, COB information not on file, patient has multiple coverages not disclosed, employer group changes, Medicare secondary payer rules not followed, or incorrect primary/secondary determination.",
      appealProcess: [
        "Verify the patient's current insurance coverage and COB order",
        "Contact the patient to confirm all active insurance plans",
        "Determine the correct primary payer using COB rules",
        "Submit the claim to the correct primary payer first",
        "After primary adjudication, bill the secondary payer with the primary EOB",
      ],
      turnaround: "30-60 days (depends on correct payer processing)",
      successRate: "55-65%",
      documents: ["Patient insurance verification", "COB determination worksheet", "Primary payer EOB if billing secondary", "Patient attestation of insurance coverage"],
      commonMistakes: ["Not verifying COB at every visit", "Assuming the same payer is always primary", "Not following Medicare Secondary Payer rules", "Submitting to secondary before primary adjudication"],
      sampleAppeal: "We are submitting this claim to [payer] as the primary insurance per COB rules. The patient has confirmed that [payer] is the primary coverage based on [birthday rule/employment status/Medicare secondary payer rules]. Enclosed is the patient's insurance verification and COB attestation.",
    },
    {
      code: "CO-27",
      category: "Contractual Obligation",
      shortDesc: "Expenses incurred after coverage terminated",
      fullDesc: "The patient's insurance coverage was not active on the date of service. The payer has determined that the patient's policy was either not yet effective or had already terminated before the date the service was rendered. This is a eligibility denial that requires verification of the patient's coverage status and potentially coordination with the patient to resolve.",
      rootCause: "Patient coverage lapsed, employer changed insurance plans, patient became Medicare-eligible, COBRA coverage expired, patient didn't pay premiums, or retroactive termination by the employer/payer.",
      appealProcess: [
        "Verify the patient's coverage status directly with the payer",
        "Contact the patient to determine if they have alternate coverage",
        "Check if the patient is eligible for COBRA or marketplace coverage",
        "If coverage was retroactively terminated, appeal with employment verification",
        "If the patient truly has no coverage, convert to self-pay",
      ],
      turnaround: "30-60 days",
      successRate: "15-25% (often the termination is valid)",
      documents: ["Patient eligibility verification", "Employment verification letter", "COBRA election documents", "Alternate insurance information"],
      commonMistakes: ["Not verifying eligibility before service", "Not contacting the patient about coverage issues", "Assuming the payer's termination date is correct", "Missing COBRA election deadlines"],
      sampleAppeal: "We are appealing the coverage termination denial for patient [name], DOS [date]. Per our verification with [employer/payer], the patient's coverage was active through [date]. Enclosed is the eligibility verification confirming active coverage on the date of service. We request reconsideration of this claim.",
    },
    {
      code: "CO-29",
      category: "Contractual Obligation",
      shortDesc: "Timely filing limit exceeded",
      fullDesc: "The claim was not submitted within the payer's required timely filing deadline. Each payer has specific filing deadlines ranging from 90 days to 1 year from the date of service. Missing these deadlines results in an automatic denial with very limited appeal options. This denial represents a significant revenue loss because it's often preventable with proper workflow management.",
      rootCause: "Delayed charge entry, late coding, held claims pending information, incorrect filing date calculation, payer system delays, or missing the initial submission deadline after a prior denial/correction.",
      appealProcess: [
        "Determine the payer's timely filing deadline for the specific plan",
        "Calculate if the claim was truly filed late or if there's a discrepancy",
        "If there was a prior claim or inquiry, use that as proof of timely initial contact",
        "Document any payer system errors that delayed processing",
        "Submit appeal with proof of timely filing (clearinghouse reports, prior claim numbers)",
        "Request a timely filing override if there are extenuating circumstances",
      ],
      turnaround: "30-90 days (longer than most appeals)",
      successRate: "15-25% (very difficult to overturn)",
      documents: ["Clearinghouse submission reports", "Prior claim reference numbers", "Payer acknowledgment of prior submissions", "Documentation of payer system errors", "Certified mail receipts if applicable"],
      commonMistakes: ["Not having documentation of original submission", "Missing the appeal deadline for the timely filing denial itself", "Not checking timely filing limits per payer before submitting", "Assuming all payers have the same filing deadline"],
      sampleAppeal: "We are appealing the timely filing denial for patient [name], DOS [date]. The original claim was submitted on [date] via [clearinghouse], within the timely filing deadline. The enclosed clearinghouse report confirms submission on [date], reference number [number]. The subsequent delay in processing was due to [payer system error/additional information request]. We request that the timely filing limit be extended based on the documented initial submission.",
    },
    {
      code: "CO-50",
      category: "Contractual Obligation",
      shortDesc: "Non-covered service per payer policy",
      fullDesc: "The service is not a covered benefit under the patient's insurance plan. Unlike CO-9, which references policy limitations, CO-50 specifically indicates that the service is statutorily or contractually excluded from coverage. This includes services like cosmetic procedures, experimental treatments, or services explicitly listed as exclusions in the plan document.",
      rootCause: "Service is explicitly excluded from the plan, the service is considered cosmetic rather than medically necessary, the treatment is classified as experimental/investigational, or the plan has a specific exclusion for this type of service.",
      appealProcess: [
        "Review the plan's specific exclusion language",
        "Determine if there's any exception process for medically necessary cases",
        "Gather strong medical necessity documentation",
        "Obtain peer-reviewed literature supporting the treatment",
        "Submit a formal appeal with comprehensive supporting evidence",
        "Request external review if internal appeal is denied",
      ],
      turnaround: "60-90 days",
      successRate: "10-20% (very low, but worth trying for high-dollar claims)",
      documents: ["Plan exclusion documentation", "Medical necessity letter from provider", "Peer-reviewed clinical literature", "Treatment history showing failed alternatives", "External review request if applicable"],
      commonMistakes: ["Not reading the specific exclusion language", "Appealing without strong medical necessity evidence", "Missing the external review option", "Not informing the patient of their financial responsibility while appealing"],
      sampleAppeal: "We are appealing the non-covered service denial for patient [name]. While [service] is typically excluded, the enclosed clinical documentation demonstrates that this treatment is medically necessary for this patient's specific condition. The treating physician has documented that all conventional alternatives have been exhausted, and peer-reviewed literature supports the efficacy of this treatment for the diagnosed condition. We request an exception based on medical necessity.",
    },
    {
      code: "CO-96",
      category: "Contractual Obligation",
      shortDesc: "Non-covered charge(s) - patient is responsible",
      fullDesc: "The specific charge is not covered under the patient's benefit plan, and the patient is financially responsible. This denial is used when the service is clearly not a covered benefit and the payer is directing the provider to bill the patient. It's important to verify whether an ABN (Advance Beneficiary Notice) was obtained for Medicare patients, as this affects the patient's liability and your ability to collect.",
      rootCause: "Service explicitly excluded from plan benefits, patient selected non-covered service, no medical necessity established, or ABN not obtained for Medicare patients.",
      appealProcess: [
        "Verify the service is truly non-covered vs. incorrectly categorized",
        "Check if the service could be covered under a different diagnosis",
        "Review if an ABN was obtained (Medicare)",
        "If billable to patient, ensure proper ABN/financial responsibility documentation",
        "If you believe the service should be covered, appeal with medical necessity documentation",
      ],
      turnaround: "30-45 days if appealing; immediate if billing patient",
      successRate: "20-30% on appeal",
      documents: ["ABN (for Medicare)", "Financial responsibility agreement", "Medical necessity documentation", "Plan benefit documentation"],
      commonMistakes: ["Writing off the balance without verifying coverage options", "Not obtaining ABN before service delivery", "Billing the patient without proper notification", "Not exploring alternative covered diagnoses"],
      sampleAppeal: "We are appealing the non-covered charge denial for CPT [code] for patient [name]. The service is medically necessary for the treatment of [diagnosis], which is a covered condition under the patient's plan. The enclosed documentation from Dr. [name] supports the medical necessity of this service. We request reconsideration of the coverage determination.",
    },
    {
      code: "CO-97",
      category: "Contractual Obligation",
      shortDesc: "Payment adjusted - bundled or included in another service",
      fullDesc: "The payment for this service has been adjusted because it is considered part of another service that was billed and paid on the same date. This is a bundling denial where the payer has determined that the procedure is a component of a more comprehensive service and cannot be billed separately. Understanding NCCI bundling rules and proper use of modifiers is essential for preventing and appealing these denials.",
      rootCause: "NCCI bundling edits, procedure is a component of the primary procedure, modifier not applied to unbundle correctly, global period inclusion, or payer-specific bundling rules beyond NCCI.",
      appealProcess: [
        "Review NCCI edits to determine if the codes can be unbundled with a modifier",
        "Check if modifier 59 or X{EPSU} is appropriate for the specific scenario",
        "Obtain clinical documentation showing the services were distinct",
        "Submit corrected claim with appropriate modifier if clinically justified",
        "If the services were truly separate, appeal with operative notes",
      ],
      turnaround: "30-45 days",
      successRate: "40-50% with proper documentation and modifiers",
      documents: ["Operative notes", "Clinical documentation showing distinct services", "NCCI edit reference", "Modifier documentation support"],
      commonMistakes: ["Using modifier 59 indiscriminately (use X{EPSU} instead)", "Not documenting why services are distinct", "Ignoring NCCI edit indicators (0 vs 1 vs 9)", "Not understanding the difference between column 1/column 2 and mutual exclusivity"],
      sampleAppeal: "We are appealing the bundling denial for CPT [code] with CPT [code] for patient [name], DOS [date]. Per NCCI guidelines, modifier [XU/XS/XE/XP] is appropriate because [reason for distinct service]. The enclosed operative notes document that these were separate and distinct procedures performed at different anatomical sites/different sessions. We request separate reimbursement for each service.",
    },
    {
      code: "CO-109",
      category: "Contractual Obligation",
      shortDesc: "Claim not covered by this payer - submit to correct payer",
      fullDesc: "The claim was submitted to the wrong payer. This denial tells you that the payer you billed does not cover this type of service or this patient, and you need to submit the claim to the correct insurance company. This is different from COB issues - it means this payer doesn't cover the service at all, not just that they're not the primary.",
      rootCause: "Wrong payer billed, patient's plan changed, service not covered by this payer type (e.g., billing workers' comp to commercial), or incorrect payer ID on the claim.",
      appealProcess: [
        "Verify the patient's correct insurance information",
        "Determine which payer should be billed",
        "Submit the claim to the correct payer",
        "Monitor for timely filing with the new payer",
      ],
      turnaround: "Depends on the correct payer's processing time",
      successRate: "N/A - not an appeal, just resubmission to correct payer",
      documents: ["Patient insurance verification", "Correct payer information", "Original denial for reference"],
      commonMistakes: ["Not verifying the correct payer before resubmission", "Missing timely filing with the correct payer", "Assuming the patient's information hasn't changed", "Not documenting the original submission date for timely filing purposes"],
      sampleAppeal: "Not applicable - this requires resubmission to the correct payer rather than an appeal.",
    },
    {
      code: "CO-125",
      category: "Contractual Obligation",
      shortDesc: "Submission/billing error(s) detected",
      fullDesc: "The claim contains one or more billing errors that prevent processing. This is a general billing error denial that can encompass a variety of issues including incorrect patient information, invalid provider numbers, missing or invalid codes, or formatting errors in the electronic submission. The specific errors are usually identified in the accompanying remark codes.",
      rootCause: "Data entry errors, invalid NPI, incorrect taxonomy codes, missing or invalid CPT/ICD codes, formatting errors in electronic submissions, or invalid payer ID.",
      appealProcess: [
        "Review the remark codes to identify specific errors",
        "Correct all identified errors in the claim",
        "Verify all demographic and coding information",
        "Submit a corrected claim",
        "Track the corrected claim for timely processing",
      ],
      turnaround: "14-30 days for corrected claim",
      successRate: "75-85% (very high when corrected properly)",
      documents: ["Corrected claim", "Supporting documentation for corrections", "Verification of all claim elements"],
      commonMistakes: ["Not addressing all identified errors", "Making new errors while correcting old ones", "Not verifying the corrected information against source documents", "Missing the timely filing deadline for the corrected submission"],
      sampleAppeal: "We are submitting a corrected claim for patient [name], DOS [date]. The original submission contained [specific errors identified in remark codes]. All errors have been corrected as follows: [list corrections]. Please process the corrected claim at your earliest convenience.",
    },
    {
      code: "CO-128",
      category: "Contractual Obligation",
      shortDesc: "Missing add-on code information",
      fullDesc: "The claim includes an add-on code without the corresponding primary procedure code, or the add-on code is not appropriate for the primary procedure billed. Add-on codes (designated by the '+' symbol in CPT) must always be reported with their associated primary procedure code and cannot be billed independently.",
      rootCause: "Add-on code billed without primary procedure, incorrect add-on code for the primary procedure, primary procedure denied separately, or missing modifier for the add-on code.",
      appealProcess: [
        "Verify the correct primary procedure code for the add-on",
        "Ensure the primary procedure is also on the claim",
        "Check CPT guidelines for proper add-on code pairing",
        "Submit corrected claim with both primary and add-on codes",
        "If primary was denied separately, address that denial first",
      ],
      turnaround: "14-30 days",
      successRate: "70-80%",
      documents: ["Corrected claim with primary and add-on codes", "CPT guidelines for code pairing", "Clinical documentation supporting both procedures"],
      commonMistakes: ["Billing add-on codes as standalone procedures", "Not knowing which primary codes go with which add-on codes", "Separating add-on and primary claims", "Not checking CPT appendices for add-on code rules"],
      sampleAppeal: "We are submitting a corrected claim for patient [name], DOS [date]. The add-on code [code] was inadvertently submitted without the primary procedure code [code]. The corrected claim includes both the primary procedure and the add-on code as required by CPT guidelines.",
    },
    {
      code: "CO-197",
      category: "Contractual Obligation",
      shortDesc: "Precertification/authorization/notification absent",
      fullDesc: "The required precertification, authorization, or notification was not obtained prior to the service being rendered. This is similar to CO-15 but specifically used by certain payers to indicate that the authorization process was not initiated at all, rather than an authorization request being denied. This denial has high appeal potential if retroactive authorization can be obtained.",
      rootCause: "No prior authorization obtained for a service that requires it, authorization request never submitted, failure to notify the payer of an admission or procedure, or authorization obtained from wrong department/payer entity.",
      appealProcess: [
        "Contact the payer immediately to request retroactive authorization",
        "Provide complete clinical documentation supporting the service",
        "Document the reason for not obtaining prior auth (emergency, oversight, etc.)",
        "If retroactive auth is granted, resubmit the claim with the auth number",
        "If retroactive auth is denied, file a formal appeal with medical necessity documentation",
      ],
      turnaround: "15-30 days for retroactive auth; 30-60 days for formal appeal",
      successRate: "55-65% for retroactive auth with strong documentation",
      documents: ["Clinical records", "Medical necessity documentation", "Emergency documentation if applicable", "Retroactive authorization request", "Provider attestation"],
      commonMistakes: ["Not requesting retroactive auth quickly enough", "Not having a process for identifying auth-required services", "Assuming inpatient admissions don't need notification", "Not documenting the reason for missing the authorization"],
      sampleAppeal: "We are requesting retroactive authorization for [service] rendered on [date] to patient [name]. The service was medically necessary as documented by Dr. [name] in the enclosed clinical records. [If emergency: The patient presented with an emergency condition that required immediate treatment, making prior authorization impractical.] We respectfully request that authorization be granted retroactively based on the clinical evidence provided.",
    },
    {
      code: "PR-1",
      category: "Patient Responsibility",
      shortDesc: "Deductible amount",
      fullDesc: "The patient's deductible has not been met, and this amount is the patient's responsibility. The deductible is the amount the patient must pay out-of-pocket before insurance begins to cover services. This is not a denial but a patient responsibility transfer. Understanding the patient's deductible status before service delivery is crucial for proper financial counseling and collections.",
      rootCause: "Patient's deductible has not been met for the plan year, high deductible health plan (HDHP), patient hasn't had enough services to meet the deductible, or the service is subject to a separate deductible (e.g., pharmacy vs. medical).",
      appealProcess: [
        "Verify the deductible amount and remaining balance with the payer",
        "Ensure the claim was processed correctly",
        "Bill the patient for the deductible amount",
        "If patient disputes, provide the EOB showing the deductible application",
        "Check if the patient has a supplemental plan that covers deductibles",
      ],
      turnaround: "N/A - patient responsibility, not an appeal",
      successRate: "N/A - this is a valid patient responsibility",
      documents: ["EOB/ERA showing deductible application", "Patient benefit verification", "Financial responsibility agreement"],
      commonMistakes: ["Writing off deductible amounts instead of billing the patient", "Not verifying remaining deductible before service", "Not informing patients of their expected financial responsibility upfront", "Not checking for supplemental coverage"],
      sampleAppeal: "Not applicable - PR-1 is a valid patient responsibility. Bill the patient for the deductible amount.",
    },
    {
      code: "PR-2",
      category: "Patient Responsibility",
      shortDesc: "Coinsurance amount",
      fullDesc: "The coinsurance amount is the patient's responsibility after the deductible has been met. Coinsurance is the percentage of the allowed amount that the patient must pay (e.g., 20% of Medicare's allowed amount). This is a legitimate patient responsibility and should not be written off unless the patient qualifies for financial assistance.",
      rootCause: "Standard coinsurance responsibility per the patient's benefit plan, patient has not met their out-of-pocket maximum, or the provider is not participating with the payer at the allowed amount level.",
      appealProcess: [
        "Verify the coinsurance calculation is correct",
        "Ensure the allowed amount matches the contracted rate",
        "Bill the patient for the coinsurance amount",
        "Check if the patient has a supplemental plan covering coinsurance",
      ],
      turnaround: "N/A - patient responsibility",
      successRate: "N/A - valid patient responsibility",
      documents: ["EOB showing coinsurance calculation", "Contract rate verification", "Patient benefit information"],
      commonMistakes: ["Writing off coinsurance instead of billing", "Not verifying the allowed amount matches the contract", "Not billing secondary insurance for coinsurance", "Accepting less than the coinsurance amount without proper authorization"],
      sampleAppeal: "Not applicable - PR-2 is a valid patient responsibility. Bill the patient for the coinsurance amount.",
    },
    {
      code: "PR-96",
      category: "Patient Responsibility",
      shortDesc: "Patient is responsible - non-covered service (ABN signed)",
      fullDesc: "The service is not covered, and the patient has signed an Advance Beneficiary Notice (ABN) accepting financial responsibility. This is specifically a Medicare denial where the provider correctly anticipated that Medicare would not cover the service and obtained the patient's agreement to pay. The ABN must have been obtained BEFORE the service was rendered.",
      rootCause: "Service not covered by Medicare, patient was properly notified via ABN before service, ABN was signed by the patient indicating they accept financial responsibility, and the provider correctly billed with the GA modifier.",
      appealProcess: [
        "Verify the ABN was properly executed before the service",
        "Ensure the ABN was specific about the expected denial reason",
        "Bill the patient per the ABN agreement",
        "If the patient wants to appeal, assist them with the Medicare appeal process",
      ],
      turnaround: "N/A - patient responsibility with valid ABN",
      successRate: "N/A - valid patient responsibility when ABN is properly executed",
      documents: ["Signed ABN form (dated before service)", "Clinical documentation", "GA modifier on the claim"],
      commonMistakes: ["Not obtaining ABN before the service", "Using a generic ABN instead of a service-specific one", "Not having the ABN properly witnessed", "Billing without the GA modifier when ABN is on file"],
      sampleAppeal: "Not applicable - PR-96 with a valid ABN is a legitimate patient responsibility. Ensure the ABN is properly executed and on file, then bill the patient accordingly.",
    },
    {
      code: "OA-23",
      category: "Other Adjustment",
      shortDesc: "Impact of prior payer's adjudication",
      fullDesc: "This adjustment reflects the impact of a prior payer's adjudication, including adjustments to charges, payments, or patient responsibility from a primary payer. This code is typically seen on secondary or tertiary payer remittances and indicates that the current payer is taking into account how the primary payer processed the claim.",
      rootCause: "Secondary payer adjusting based on primary payer's allowed amount, coordination of benefits calculation, primary payer's patient responsibility being applied by secondary, or contractual adjustments cascading from primary to secondary.",
      appealProcess: [
        "Verify the primary payer's adjudication was correct",
        "Ensure the secondary payer is applying the correct coordination rules",
        "Compare the primary EOB with the secondary ERA for discrepancies",
        "Appeal to the secondary payer if they're not properly coordinating benefits",
      ],
      turnaround: "30-45 days",
      successRate: "35-45%",
      documents: ["Primary payer EOB", "Secondary claim submission with primary EOB attached", "COB calculation worksheet"],
      commonMistakes: ["Not including the primary EOB when billing secondary", "Not understanding how secondary payer calculates their payment", "Missing timely filing for secondary submission", "Not appealing when secondary underpays based on incorrect primary information"],
      sampleAppeal: "We are appealing the secondary payer's adjustment for patient [name], DOS [date]. The primary payer [name] allowed $[amount] and paid $[amount], with $[amount] patient responsibility. Per coordination of benefits rules, the secondary payer should cover the remaining $[amount]. The enclosed primary EOB confirms the adjudication details.",
    },
    {
      code: "N290",
      category: "Remark Code",
      shortDesc: "Missing/incomplete/invalid referring provider info",
      fullDesc: "The claim is missing, has incomplete, or has invalid referring provider information. This remark code often accompanies CO-16 denials and specifically identifies that the referring or ordering provider's information is the missing element. Many services, especially diagnostic tests and specialist referrals, require a valid referring provider NPI on the claim.",
      rootCause: "Missing referring provider NPI, invalid or deactivated NPI, referring provider not enrolled with the payer, incorrect NPI format, or referring provider name/NPI mismatch.",
      appealProcess: [
        "Obtain the correct referring provider information from clinical records",
        "Verify the NPI is active and enrolled with the payer",
        "Submit a corrected claim with the valid referring provider information",
        "If the service doesn't require a referral, resubmit with appropriate documentation",
      ],
      turnaround: "14-30 days for corrected claim",
      successRate: "75-85%",
      documents: ["Corrected claim with valid referring provider NPI", "Referral documentation if applicable", "NPI verification from NPPES"],
      commonMistakes: ["Using the billing provider NPI as the referring provider", "Not verifying the NPI is active before resubmission", "Submitting without checking if the referring provider is enrolled", "Not understanding which services require a referring provider"],
      sampleAppeal: "We are submitting a corrected claim for patient [name], DOS [date]. The referring provider information has been updated to include Dr. [name], NPI [number]. The NPI has been verified as active and enrolled with [payer]. Please process the corrected claim.",
    },
    {
      code: "N425",
      category: "Remark Code",
      shortDesc: "Statutorily excluded service",
      fullDesc: "The service is statutorily excluded from coverage under Medicare or other government programs. This means Congress has specifically written this service out of the program's benefit package. Unlike contractual exclusions that can sometimes be appealed on medical necessity grounds, statutory exclusions are nearly impossible to overturn through the appeals process.",
      rootCause: "Service is explicitly excluded by statute (e.g., routine physicals, cosmetic surgery, hearing aids under Medicare), the service falls under a category that Congress has excluded, or the claim was submitted to a government program that doesn't cover this service category.",
      appealProcess: [
        "Verify the service is truly statutorily excluded",
        "Check if any exceptions apply (e.g., Medicare covers some preventive services)",
        "If the service might be covered under a different diagnosis, explore that option",
        "Bill the patient with proper ABN documentation",
        "Consider whether the service can be recoded to a covered benefit if clinically appropriate",
      ],
      turnaround: "N/A - statutory exclusion is generally not appealable",
      successRate: "5-10% (very rare to overturn a statutory exclusion)",
      documents: ["ABN (for Medicare patients)", "Statutory reference documentation", "Alternative diagnosis documentation if applicable"],
      commonMistakes: ["Wasting resources appealing a clear statutory exclusion", "Not obtaining ABN before delivering excluded services", "Not informing patients of their financial responsibility", "Not exploring if an alternative covered diagnosis applies"],
      sampleAppeal: "While we understand that [service] is generally statutorily excluded, we are requesting an exception based on the unique clinical circumstances of this patient. The enclosed documentation demonstrates that [specific clinical reason] makes this service medically necessary in this case, and we request consideration under any applicable exception provisions.",
    },
  ],

  // ===== PAYER-SPECIFIC RULES =====
  payerRules: [
    {
      name: "Medicare",
      timelyFiling: "365 days from date of service",
      appealTimeframe: "120 days from denial date for redetermination (1st level)",
      appealLevels: ["Redetermination (120 days)", "QIC Review (180 days)", "ALJ Hearing (60 days after QIC)", "Council Review (60 days after ALJ)", "Federal Court"],
      commonDenials: ["CO-50 (non-covered service)", "CO-97 (bundling)", "CO-197 (no auth)", "PR-96 (ABN-related)", "CO-29 (timely filing)"],
      contact: "1-800-633-4227 | www.cms.gov",
      specialNotes: "Medicare has 5 levels of appeal. Always request redetermination within 120 days. ABN is critical for non-covered services. MAC-specific LCDs vary by jurisdiction.",
    },
    {
      name: "UnitedHealthcare",
      timelyFiling: "90 days (commercial), 180 days (some plans)",
      appealTimeframe: "180 days from denial date",
      appealLevels: ["First-level appeal (180 days)", "Second-level appeal", "External review (IRO)"],
      commonDenials: ["CO-15 (no auth)", "CO-197 (no precert)", "CO-97 (bundling)", "CO-4 (code inconsistency)", "CO-11 (diagnosis mismatch)"],
      contact: "Provider Services: 877-842-3210 | UHC Provider Portal",
      specialNotes: "UHC has strict auth requirements. Use the UHC Provider Portal for real-time eligibility and auth status. Check OptumInsight edits in addition to NCCI. CO-97 denials often require detailed operative notes for appeal.",
    },
    {
      name: "Aetna",
      timelyFiling: "90 days (most plans)",
      appealTimeframe: "60 days from denial date",
      appealLevels: ["First-level appeal (60 days)", "Second-level appeal", "External review"],
      commonDenials: ["CO-15 (no auth)", "CO-50 (non-covered)", "CO-9 (not covered per policy)", "CO-97 (bundling)"],
      contact: "Provider Services: 800-624-0756 | Aetna Provider Portal",
      specialNotes: "Aetna's Clinical Policy Bulletins (CPBs) are the key reference for coverage determinations. Precertification is required for many outpatient procedures. Aetna has specific rules for out-of-network emergency services.",
    },
    {
      name: "Cigna",
      timelyFiling: "90 days (in-network), 180 days (out-of-network)",
      appealTimeframe: "60 days from denial date",
      appealLevels: ["First-level appeal (60 days)", "Second-level appeal", "External review"],
      commonDenials: ["CO-15 (no auth)", "CO-11 (diagnosis inconsistency)", "CO-97 (bundling)", "CO-50 (non-covered)"],
      contact: "Provider Services: 800-244-6224 | Cigna for HCP Portal",
      specialNotes: "Cigna requires precertification for many advanced imaging services. Cigna's Medical Coverage Policies are the reference for appeal documentation. Pre-notification (vs. precertification) has different requirements.",
    },
    {
      name: "Blue Cross Blue Shield",
      timelyFiling: "Varies by plan (90-365 days), typically 180 days",
      appealTimeframe: "60-180 days depending on the specific BCBS plan",
      appealLevels: ["First-level appeal", "Second-level appeal", "External review (IRO)"],
      commonDenials: ["CO-15 (no auth)", "CO-4 (code inconsistency)", "CO-22 (COB)", "CO-50 (non-covered)"],
      contact: "Varies by local BCBS plan | BCBS Provider Portal",
      specialNotes: "BCBS is not a single entity - each plan (Anthem, Regence, Horizon, etc.) has different rules. Always verify the specific BCBS plan's requirements. Inter-plan disputes (billing out-of-area BCBS patients) have special handling through the BlueCard program.",
    },
    {
      name: "Humana",
      timelyFiling: "90 days (commercial), 365 days (Medicare Advantage)",
      appealTimeframe: "60 days from denial date (commercial), 60 days (MA)",
      appealLevels: ["First-level appeal (60 days)", "Second-level appeal", "External review"],
      commonDenials: ["CO-15 (no auth)", "CO-50 (non-covered)", "CO-97 (bundling)", "CO-22 (COB)"],
      contact: "Provider Services: 800-457-4708 | Humana Provider Portal",
      specialNotes: "Humana Medicare Advantage plans have specific auth requirements that differ from commercial. Humana's Coverage Determination Guidelines are key reference documents. MA plans must follow Medicare coverage rules but can have additional requirements.",
    },
    {
      name: "Tricare",
      timelyFiling: "365 days from date of service",
      appealTimeframe: "90 days from denial date",
      appealLevels: ["Reconsideration (90 days)", "Formal review", "TRICARE Hearing", "Judicial review"],
      commonDenials: ["CO-15 (no auth/referral)", "CO-50 (non-covered)", "CO-27 (eligibility)", "CO-4 (code inconsistency)"],
      contact: "Provider Services: 800-444-5445 | Tricare Provider Portal",
      specialNotes: "Tricare requires referrals for most specialist visits. Active duty vs. retiree coverage differs significantly. Tricare follows Medicare coding guidelines but has its own coverage determinations. DS (Tricare for Life) acts as secondary to Medicare.",
    },
    {
      name: "Medicaid (State-specific)",
      timelyFiling: "Varies by state (90-365 days)",
      appealTimeframe: "Varies by state (30-120 days)",
      appealLevels: ["State fair hearing (varies)", "Administrative law judge", "State court review"],
      commonDenials: ["CO-15 (no auth)", "CO-50 (non-covered)", "CO-27 (eligibility)", "CO-9 (not covered per policy)"],
      contact: "State Medicaid office | State-specific provider portal",
      specialNotes: "Medicaid rules vary dramatically by state. Eligibility can change monthly. Many Medicaid managed care plans have separate auth requirements from fee-for-service Medicaid. Dual-eligible patients (Medicare + Medicaid) have special coordination rules. State fair hearings often have better success rates than commercial appeals.",
    },
  ],

  // ===== RCM WORKFLOW =====
  rcmWorkflow: {
    phases: [
      {
        name: "Patient Access & Registration",
        description: "The front door of the revenue cycle. This phase includes scheduling, registration, eligibility verification, prior authorization, and financial counseling. Errors here cascade through the entire cycle and account for up to 60% of downstream denials. Getting this right is the single most impactful improvement any organization can make.",
        steps: [
          "Schedule patient appointment with correct service type",
          "Verify insurance eligibility and benefits in real-time",
          "Determine prior authorization requirements",
          "Obtain prior authorization before service date",
          "Verify patient demographics and update as needed",
          "Collect copayments and outstanding balances",
          "Obtain ABN for potentially non-covered Medicare services",
          "Confirm referral requirements are met",
        ],
        kpis: ["Eligibility verification rate > 98%", "Prior auth completion rate > 95%", "Registration accuracy > 99%", "Point-of-service collection rate > 90%"],
      },
      {
        name: "Charge Capture & Coding",
        description: "Transforming clinical services into billable charges. This phase includes charge entry, CPT/ICD-10 coding, charge reconciliation, and coding quality review. Coding accuracy directly impacts claim acceptance rates and revenue optimization. Under-coding loses revenue, over-coding risks audits and penalties.",
        steps: [
          "Capture all billable charges from clinical documentation",
          "Assign appropriate CPT codes based on documentation",
          "Assign appropriate ICD-10 diagnosis codes",
          "Apply necessary modifiers per NCCI and payer requirements",
          "Verify code combinations against NCCI edits",
          "Reconcile charges against scheduled procedures",
          "Conduct coding quality review and audits",
          "Submit charges for billing within required timeframes",
        ],
        kpis: ["Coding accuracy > 96%", "Charge lag < 3 days", "Clean claim rate > 95%", "Coding query response time < 24 hours"],
      },
      {
        name: "Claim Submission",
        description: "Submitting accurate claims to payers for reimbursement. This includes scrubbing claims for errors, submitting electronically, managing rejections, and tracking claim status. A high first-pass resolution rate is the key metric - every rejected claim adds cost and delays revenue.",
        steps: [
          "Scrub claims for errors and missing information",
          "Verify all required fields are complete and accurate",
          "Submit claims electronically via clearinghouse",
          "Monitor for clearinghouse rejections and correct immediately",
          "Track claim acknowledgment from payers",
          "Manage rejected claims within 24-48 hours",
          "Resubmit corrected claims promptly",
        ],
        kpis: ["First-pass resolution rate > 90%", "Claim rejection rate < 5%", "Average days to submit < 5", "Electronic submission rate > 98%"],
      },
      {
        name: "Payment Posting & Reconciliation",
        description: "Recording payer payments, adjustments, and patient responsibility. This phase includes posting ERA/EOB data, reconciling payments against expected amounts, identifying underpayments, and transferring balances to patient responsibility. Accuracy here is critical - missed underpayments directly reduce revenue.",
        steps: [
          "Post electronic remittance advice (ERA) automatically",
          "Reconcile payment amounts against contracted rates",
          "Identify and flag underpayments for appeal",
          "Transfer patient responsibility balances",
          "Post contractual adjustments correctly",
          "Reconcile daily posting to bank deposits",
          "Generate and review payment variance reports",
        ],
        kpis: ["Payment posting accuracy > 99%", "Underpayment identification rate > 90%", "Posting lag < 48 hours", "Cash application rate > 98%"],
      },
      {
        name: "Denial Management",
        description: "The core of revenue recovery. This phase involves identifying denials, categorizing them by type and root cause, working appeals within filing deadlines, and tracking outcomes. An effective denial management program recovers 50-65% of initially denied revenue and, more importantly, prevents future denials through root cause analysis and process improvement.",
        steps: [
          "Identify and categorize all denials within 24 hours",
          "Prioritize denials by dollar value and appeal likelihood",
          "Route denials to appropriate team members by specialty",
          "Research denial reasons and determine appeal strategy",
          "Prepare and submit appeals with supporting documentation",
          "Track appeal deadlines and outcomes",
          "Perform root cause analysis on denial trends",
          "Implement process improvements to prevent recurring denials",
        ],
        kpis: ["Denial rate < 5%", "Appeal success rate > 50%", "Days to appeal < 14", "Net denial write-off < 2% of revenue"],
      },
      {
        name: "AR Follow-up & Collections",
        description: "Managing outstanding accounts receivable to ensure timely payment. This includes working aged AR, following up on unpaid claims, managing patient collections, and identifying write-off candidates. The goal is to minimize days in AR while maximizing collections.",
        steps: [
          "Work AR aging buckets systematically (30/60/90/120+)",
          "Follow up on unpaid claims with payers",
          "Identify and resolve claim status issues",
          "Manage patient balance collections",
          "Process payment plans for large balances",
          "Evaluate accounts for bad debt write-off",
          "Generate AR aging reports and trend analysis",
        ],
        kpis: ["Days in AR < 40", "AR > 120 days < 10%", "Collections rate > 95%", "Write-off rate < 2%"],
      },
    ],
  },

  // ===== APPEAL STRATEGIES =====
  appealStrategies: {
    firstLevel: {
      name: "First-Level Appeal / Redetermination",
      timeframe: "60-180 days from denial (varies by payer)",
      description: "The initial formal request for the payer to reconsider their denial decision. This is your best opportunity to overturn a denial because the standard of review is most favorable at this stage. You must submit a written appeal with all supporting documentation within the payer's specified timeframe.",
      tips: [
        "Always appeal within the specified timeframe - late appeals are automatically denied",
        "Include a clear, concise appeal letter that addresses the specific denial reason",
        "Attach all relevant medical records, not just selected pages",
        "Include a letter of medical necessity from the treating physician",
        "Reference specific payer policy numbers and coverage criteria",
        "Use the correct appeal reference number from the EOB",
        "Send via certified mail or electronic submission with confirmation",
        "Keep copies of everything submitted",
      ],
    },
    secondLevel: {
      name: "Second-Level Appeal / Reconsideration",
      timeframe: "60 days after first-level denial (varies by payer)",
      description: "If the first-level appeal is denied, you can escalate to a second-level review. This review is typically conducted by a different reviewer or panel within the payer organization. The second level often requires more comprehensive documentation and a stronger argument addressing the reasons the first appeal was denied.",
      tips: [
        "Address each reason given for the first-level denial specifically",
        "Provide any new or additional documentation not included in the first appeal",
        "Request a peer-to-peer review if not already done",
        "Include published clinical guidelines or peer-reviewed literature",
        "Consider engaging a healthcare attorney for high-dollar claims",
        "Document all phone communications with the payer",
      ],
    },
    externalReview: {
      name: "External Review / Independent Review Organization (IRO)",
      timeframe: "Varies by state and plan type",
      description: "If internal appeals are exhausted, you can request an external review by an Independent Review Organization. The IRO is independent of the insurance company and makes a binding decision. For ACA-compliant plans, external review is a right; for other plans, it varies by state law.",
      tips: [
        "Exhaust all internal appeals first (required before external review)",
        "File the external review request within the specified timeframe",
        "Ensure your documentation is complete and well-organized",
        "Include a clear summary of why the payer's decision is wrong",
        "The IRO's decision is binding on the payer but not necessarily on you",
        "External review success rates are significantly higher than internal appeals",
      ],
    },
  },

  // ===== COMMUNICATION TEMPLATES =====
  communicationTemplates: {
    payerCallScript: {
      opening: "Hello, my name is [name] calling from [practice/facility] on behalf of patient [patient name], DOB [date], and member ID [number]. I'm calling regarding claim [number] for date of service [date].",
      questions: [
        "Can you confirm the current status of this claim?",
        "What is the specific reason for the denial/adjustment?",
        "Is there a specific remark code I should reference?",
        "What documentation is needed for appeal?",
        "What is the appeal deadline for this claim?",
        "Can you provide the correct mailing address or fax for appeals?",
        "Is there a specific appeal form required?",
        "Can I request a peer-to-peer review?",
        "What is the reference number for this call?",
      ],
      closing: "Thank you for your assistance. I've documented this call under reference number [number]. I will [submit the appeal/corrected claim/provide additional documentation] by [date]. Could you please confirm the best way to follow up on this?",
    },
    appealLetterTemplate: {
      structure: [
        "Date and reference information",
        "Patient and claim identification",
        "Statement of what is being appealed",
        "Specific denial reason and code",
        "Why the denial should be overturned (with evidence)",
        "Supporting documentation list",
        "Request for specific action (reprocess, pay, etc.)",
        "Contact information for questions",
      ],
    },
    escalationLanguage: {
      polite: "I understand the policy, but I believe there are exceptional circumstances that warrant a review of this decision. The clinical documentation clearly supports the medical necessity of this service.",
      firm: "I've reviewed the applicable coverage policy and the clinical documentation meets all stated criteria. I request that this claim be reprocessed in accordance with the policy provisions.",
      urgent: "This denial is impacting patient care and creating a financial hardship. I request an expedited review and a peer-to-peer discussion with your medical director as soon as possible.",
    },
  },

  // ===== COMMON SCENARIOS =====
  scenarios: [
    {
      title: "Emergency service denied for no prior authorization",
      description: "A patient presented to the ER with acute chest pain and required an emergency cardiac catheterization. The payer denied the claim citing no prior authorization. The patient was admitted and the procedure was medically necessary.",
      approach: "Request retroactive authorization immediately, emphasizing the emergency nature of the service. Medicare and most commercial payers cannot require prior authorization for true emergency services. Submit the appeal with emergency department records, physician attestation of the emergency, and documentation that delay would have endangered the patient.",
      talkingPoints: [
        "Per EMTALA and payer policy, emergency services do not require prior authorization",
        "The patient presented with a life-threatening condition requiring immediate intervention",
        "Delaying the procedure for authorization would have endangered the patient's life",
        "The clinical documentation clearly supports the emergency nature of this service",
      ],
      followUp: "If retroactive auth is denied, escalate to peer-to-peer review. Document all communications. If the payer continues to deny, file a complaint with the state insurance commissioner for improper denial of emergency services.",
    },
    {
      title: "Repeated CO-16 denials for missing information",
      description: "A practice is receiving multiple CO-16 denials from the same payer, each time citing a different missing element. The claims seem complete when submitted but the payer keeps finding issues.",
      approach: "Request a detailed review of each denial's specific remark code. Schedule a call with the payer's provider relations team to understand their specific claim submission requirements. Often, payers have formatting or data requirements that aren't clearly documented. Create a checklist specific to this payer's requirements.",
      talkingPoints: [
        "We need to understand the specific elements your system requires that we may not be providing",
        "Can we schedule a claims submission review to identify the root cause?",
        "What specific data elements in the electronic format are triggering these denials?",
        "Is there a companion guide or specific formatting requirement we should be following?",
      ],
      followUp: "Implement payer-specific claim scrubbing rules. Track denial patterns by payer and missing element. Consider a clearinghouse claim scrubbing tool that can catch these issues before submission.",
    },
    {
      title: "High-dollar surgery denied as not medically necessary",
      description: "A complex spinal fusion surgery was denied as not medically necessary. The patient has documented chronic pain, failed conservative treatment over 6 months, and imaging showing significant spinal stenosis.",
      approach: "This requires a strong medical necessity appeal with comprehensive documentation. Gather all conservative treatment records, imaging reports, pain management documentation, and a detailed letter of medical necessity from the surgeon. Request a peer-to-peer review with the payer's medical director.",
      talkingPoints: [
        "The patient has exhausted all conservative treatment options over 6+ months",
        "Imaging confirms significant spinal stenosis requiring surgical intervention",
        "The treating surgeon and consulting specialists all recommend this procedure",
        "Peer-reviewed literature supports surgical intervention for this condition after conservative treatment failure",
        "Continued non-surgical management poses significant risk to the patient's quality of life and functional status",
      ],
      followUp: "If the peer-to-peer is unsuccessful, file a formal written appeal with all documentation. Request an IRO review if the appeal is denied. Consider having the patient's primary care physician and any consulting specialists also submit letters supporting medical necessity.",
    },
    {
      title: "Payer applying incorrect fee schedule / underpayment",
      description: "A payer is reimbursing at a rate significantly lower than the contracted amount. The allowed amount on the EOB doesn't match the fee schedule in the provider contract.",
      approach: "Pull the specific contract and fee schedule for this payer. Compare the contracted rate with the allowed amount on the EOB. Document the discrepancy and submit an underpayment appeal with the contract rate documentation. This is not a denial appeal - it's a contract compliance issue.",
      talkingPoints: [
        "Per our contract dated [date], CPT [code] should be reimbursed at $[amount]",
        "The EOB shows an allowed amount of $[amount], which is $[difference] less than the contracted rate",
        "We need this claim reprocessed at the correct contracted rate",
        "Can you verify which fee schedule version was applied to this claim?",
      ],
      followUp: "If the payer doesn't correct the underpayment, escalate to provider relations and contract management. Document all underpayments for contract renegotiation leverage. If the issue is systematic, it may warrant a contract compliance audit.",
    },
    {
      title: "Out-of-network claim paid at in-network rate",
      description: "A provider billed an out-of-network claim but the payer processed it at the in-network rate, resulting in significantly lower reimbursement and higher patient responsibility.",
      approach: "Verify the provider's network status with the payer first. If truly out-of-network, appeal with proof of non-participation and request reprocessing at the out-of-network rate. Check if the patient has out-of-network benefits and what the allowed amount should be.",
      talkingPoints: [
        "Dr. [name] is not contracted with [payer] as confirmed by [verification method]",
        "The claim was processed incorrectly at the in-network rate",
        "The patient has out-of-network benefits and the claim should be reprocessed accordingly",
        "Per the patient's benefit plan, out-of-network services are covered at [percentage]% of the allowed amount",
      ],
      followUp: "If the payer claims the provider is in-network, verify with your credentialing department. Check if there's a single-case agreement in place. Assist the patient with any balance that exceeds the out-of-network allowed amount.",
    },
    {
      title: "Timely filing denial but claim was submitted on time",
      description: "The payer denied a claim for timely filing, but clearinghouse records show the claim was submitted within the filing deadline. The payer's system may have lost the original submission.",
      approach: "Gather all evidence of timely submission - clearinghouse reports with timestamps, claim acknowledgment reports, and any payer correspondence acknowledging receipt. Submit an appeal with this documentation proving the original submission date.",
      talkingPoints: [
        "Our clearinghouse records show the claim was submitted on [date], well within the filing deadline",
        "The claim acknowledgment report from [clearinghouse] confirms receipt by the payer on [date]",
        "The original claim reference number is [number]",
        "The payer's system may have lost the original submission - we have proof of timely filing",
      ],
      followUp: "If the payer still denies, request a supervisor review with all documentation. File a complaint with the state insurance department if the payer continues to deny despite clear evidence of timely filing. This is a compliance issue on the payer's end.",
    },
    {
      title: "Bundling denial for distinct procedures",
      description: "Two procedures performed during the same surgical session were bundled, but they are genuinely distinct procedures at different anatomical sites or different sessions.",
      approach: "Review NCCI edits to determine if a modifier can unbundle the codes. Apply the appropriate modifier (XU for distinct, XS for separate structure, XE for separate encounter, XP for separate practitioner). Submit a corrected claim with the modifier and detailed operative notes showing the distinct nature of the services.",
      talkingPoints: [
        "These procedures were performed at different anatomical sites",
        "The operative notes clearly document two distinct procedures",
        "Modifier [XU/XS/XE/XP] is appropriate per NCCI guidelines because [specific reason]",
        "The NCCI edit indicator allows a modifier for this code pair",
      ],
      followUp: "If the corrected claim is still denied, appeal with a letter explaining why the services meet the criteria for the specific modifier used. Include relevant CPT guidelines and NCCI manual references.",
    },
    {
      title: "Patient disputes responsibility for deductible/coinsurance",
      description: "A patient is refusing to pay their deductible or coinsurance, claiming the provider said insurance would cover everything.",
      approach: "Review the patient's financial responsibility agreement and any documentation of financial counseling provided before service. Provide the patient with a copy of the EOB showing how the deductible/coinsurance was applied. Offer a payment plan if needed.",
      talkingPoints: [
        "Per your insurance plan, the deductible/coinsurance is your responsibility",
        "The EOB from your insurance company shows the amount applied to your deductible",
        "We verified your benefits before your visit and informed you of your estimated responsibility",
        "I can set up a payment plan if the full amount is a hardship",
      ],
      followUp: "If the patient still refuses, document all collection attempts. Follow your organization's bad debt policy. Consider financial assistance programs if the patient qualifies. Never write off patient responsibility without proper documentation and approval.",
    },
    {
      title: "Workers' compensation claim denied as not work-related",
      description: "A workers' compensation claim was denied because the payer determined the injury was not work-related, but the patient and employer both state it occurred at work.",
      approach: "Gather all evidence of work-relatedness - incident reports, witness statements, employer verification, and the treating physician's opinion on causation. Submit the appeal with comprehensive documentation linking the injury to the workplace incident.",
      talkingPoints: [
        "The injury occurred on [date] at [workplace location] as documented in the incident report",
        "The employer has confirmed the injury is work-related",
        "The treating physician has documented that the condition is consistent with a workplace injury",
        "Witness statements corroborate the incident",
      ],
      followUp: "If the WC carrier still denies, the patient may need to hire a workers' compensation attorney. In most states, disputed WC claims are resolved through the state's WC board or commission. Assist the patient with any documentation they need for the WC hearing.",
    },
    {
      title: "Multiple denials from the same payer for the same reason",
      description: "A pattern of denials from a specific payer, all citing the same reason code. This indicates a systemic issue rather than individual claim problems.",
      approach: "This is a root cause issue, not an individual claim issue. Analyze the denial pattern to identify the common thread. Schedule a meeting with the payer's provider relations team. It may be a system issue on their end, a contract interpretation difference, or a process gap on your end that needs fixing.",
      talkingPoints: [
        "We've noticed a pattern of [denial type] denials totaling $[amount] across [number] claims",
        "This appears to be a systemic issue rather than individual claim errors",
        "We'd like to schedule a meeting to understand the root cause and develop a resolution",
        "Can we review our contract terms and your current processing guidelines together?",
      ],
      followUp: "Implement the resolution identified in the payer meeting. Track the denial rate before and after to measure improvement. Document everything for contract renegotiation. If the payer is unresponsive, escalate to your contract management team and consider filing a complaint with the state insurance department.",
    },
    {
      title: "Claim denied as duplicate but services were different",
      description: "Two claims for the same patient on the same date of service were denied as duplicates, but the services were genuinely different - for example, two separate E&M visits for different problems.",
      approach: "Review the claims to understand why the payer's system flagged them as duplicates. Add the appropriate modifier (25 for significant, separately identifiable E&M service on the same day as a procedure, or 59/X{EPSU} for distinct procedural services). Submit corrected claims with detailed documentation.",
      talkingPoints: [
        "These are two separate and distinct services provided on the same date",
        "Modifier 25/59/X{EPSU} applies because [specific reason]",
        "The clinical documentation supports two separate visits/procedures",
        "Each service has its own diagnosis and medical necessity",
      ],
      followUp: "Train coders on same-day service billing rules. Implement a pre-submission review for claims with multiple same-day services. Track modifier usage and payer acceptance rates.",
    },
    {
      title: "Payer requesting medical records after claim submission",
      description: "The payer is requesting medical records to process a claim that was submitted clean. This is delaying payment and adding administrative burden.",
      approach: "Submit the requested records promptly with a cover letter referencing the claim number. Document the request and response timeline. If this is a recurring pattern for the same payer, investigate whether there's a way to include clinical documentation proactively or whether the payer has changed their documentation requirements.",
      talkingPoints: [
        "We are providing the requested medical records for claim [number]",
        "Can you confirm receipt and an expected processing timeline?",
        "Is there a way to proactively include this documentation with future claims to avoid delays?",
        "What specific documentation elements are you looking for?",
      ],
      followUp: "Track payer documentation request patterns. If certain CPT codes consistently trigger record requests, consider including documentation upfront. Negotiate with the payer to reduce unnecessary documentation requests during contract renewals.",
    },
    {
      title: "Coordination of Benefits dispute between two payers",
      description: "Two payers are both claiming the other is primary, and neither will process the claim. The patient is caught in the middle and the provider is not getting paid.",
      approach: "Determine the correct primary payer using COB rules (birthday rule for dependents, employment status for adults, Medicare Secondary Payer rules for Medicare-eligible patients). Submit written COB determinations to both payers with supporting documentation. If neither payer will process, file complaints with both payers and the state insurance department.",
      talkingPoints: [
        "Per COB rules, [payer] is primary because [specific rule: birthday rule/MSP/employment status]",
        "Both payers cannot deny primary responsibility - one must process first",
        "The patient has confirmed their coverage status with both plans",
        "We request that this claim be processed per standard COB guidelines",
      ],
      followUp: "Document all communications with both payers. If the dispute continues beyond 45 days, file complaints with the state insurance department for both payers. The patient may need to get involved to resolve the COB issue. In some states, there's a specific COB dispute resolution process.",
    },
    {
      title: "Retroactive eligibility termination",
      description: "A claim was paid, but the payer later recouped the payment because the patient's coverage was retroactively terminated. The provider already rendered services in good faith based on active eligibility at the time of service.",
      approach: "Contact the patient to verify their current coverage status and determine if they have replacement coverage. If the retroactive termination was due to the employer changing plans, the new plan may be responsible. Appeal the recoupment with documentation that eligibility was verified at the time of service.",
      talkingPoints: [
        "We verified eligibility on [date] and the patient was active at the time of service",
        "The retroactive termination was not communicated to us or the patient in a timely manner",
        "We rendered services in good faith based on active eligibility verification",
        "We request that the recoupment be reversed based on the eligibility verification on file",
      ],
      followUp: "If the appeal is denied, bill the patient or the new payer. Implement real-time eligibility verification at every visit. For high-risk patients, consider real-time eligibility checks on the day of service. Track retroactive termination patterns by payer.",
    },
    {
      title: "Peer-to-peer review preparation",
      description: "A payer has agreed to a peer-to-peer review for a denied claim. The treating physician needs to be prepared to make a compelling case to the payer's medical director.",
      approach: "Prepare a comprehensive briefing package for the physician including: the specific denial reason, the relevant payer policy, the clinical documentation supporting medical necessity, peer-reviewed literature references, and key talking points. The physician should be prepared to discuss the specific clinical decision-making and why alternative treatments were not appropriate.",
      talkingPoints: [
        "The clinical documentation clearly supports the medical necessity of this service",
        "Conservative treatments were attempted and failed over [timeframe]",
        "The patient's condition meets the criteria in your policy [reference number]",
        "Peer-reviewed literature supports this treatment approach for this diagnosis",
        "The alternative would be [describe] which carries [risks/costs]",
      ],
      followUp: "Document the outcome of the peer-to-peer review. If the denial is upheld, proceed with formal written appeal. If overturned, monitor for payment within the expected timeframe. Track peer-to-peer success rates by physician and payer to identify training opportunities.",
    },
  ],

  // ===== COMPLIANCE =====
  compliance: {
    hipaa: {
      keyPoints: [
        "Protected Health Information (PHI) must be safeguarded at all times",
        "Minimum necessary standard: only access/share the minimum PHI needed",
        "Business Associate Agreements required with all vendors handling PHI",
        "Patient rights: access, amendment, accounting of disclosures, restriction requests",
        "Breach notification: 60 days for covered entities, without unreasonable delay for BAs",
        "Administrative, physical, and technical safeguards required",
        "Regular risk assessments and workforce training required",
        "Penalties: $100-$50,000 per violation, up to $1.5M per year per category",
      ],
      voiceAssistantNotes: "The AI voice assistant must never disclose PHI to unauthorized parties. All conversations containing PHI must be encrypted. Voice recordings are PHI and must be stored securely. The assistant should verify caller identity before discussing any patient information. Call recordings must be included in the organization's HIPAA compliance program.",
    },
    noSurprisesAct: {
      keyPoints: [
        "Protects patients from surprise billing for emergency services",
        "Requires good faith cost estimates for uninsured/self-pay patients",
        "Independent Dispute Resolution (IDR) process for payment disputes",
        "Out-of-network emergency services must be covered at in-network rates",
        "Patients can only be balanced billed in limited circumstances",
        "Provider must inform patients of their rights under the NSA",
      ],
    },
    documentation: {
      standards: [
        "All clinical documentation must be complete, accurate, and timely",
        "Medical records must support the medical necessity of services billed",
        "Documentation must be authenticated (signed/dated) by the rendering provider",
        "Late entries, addenda, and amendments must be clearly identified",
        "Documentation must be sufficient for another provider to understand the patient's condition and treatment",
        "Never alter, backdate, or destroy medical records",
      ],
    },
  },
};

// Helper function to search the knowledge base
export function searchKnowledgeBase(query: string): string[] {
  const results: string[] = [];
  const queryLower = query.toLowerCase();

  // Search denial codes
  for (const code of RCM_KNOWLEDGE_BASE.denialCodes) {
    if (
      queryLower.includes(code.code.toLowerCase()) ||
      queryLower.includes(code.shortDesc.toLowerCase()) ||
      code.fullDesc.toLowerCase().includes(queryLower) ||
      code.category.toLowerCase().includes(queryLower)
    ) {
      results.push(
        `**${code.code} (${code.category})**: ${code.shortDesc}\n\n${code.fullDesc}\n\n**Root Cause**: ${code.rootCause}\n\n**Appeal Process**: ${code.appealProcess.join(" → ")}\n\n**Success Rate**: ${code.successRate}\n\n**Documents Needed**: ${code.documents.join(", ")}\n\n**Sample Appeal**: ${code.sampleAppeal}`
      );
    }
  }

  // Search payer rules
  for (const payer of RCM_KNOWLEDGE_BASE.payerRules) {
    if (payer.name.toLowerCase().includes(queryLower) || queryLower.includes("payer")) {
      results.push(
        `**${payer.name}**: Timely Filing: ${payer.timelyFiling} | Appeal Window: ${payer.appealTimeframe} | Common Denials: ${payer.commonDenials.join(", ")} | Contact: ${payer.contact}\n\n**Special Notes**: ${payer.specialNotes}`
      );
    }
  }

  // Search scenarios
  for (const scenario of RCM_KNOWLEDGE_BASE.scenarios) {
    if (
      scenario.title.toLowerCase().includes(queryLower) ||
      scenario.description.toLowerCase().includes(queryLower)
    ) {
      results.push(
        `**Scenario: ${scenario.title}**\n\n${scenario.description}\n\n**Approach**: ${scenario.approach}\n\n**Key Points**: ${scenario.talkingPoints.join("; ")}`
      );
    }
  }

  // Search workflow
  for (const phase of RCM_KNOWLEDGE_BASE.rcmWorkflow.phases) {
    if (phase.name.toLowerCase().includes(queryLower)) {
      results.push(
        `**${phase.name}**: ${phase.description}\n\n**Steps**: ${phase.steps.join(" → ")}\n\n**KPIs**: ${phase.kpis.join(", ")}`
      );
    }
  }

  return results;
}

// Get system prompt for the AI based on language
export function getSystemPrompt(language: string = "en"): string {
  const profile = RCM_KNOWLEDGE_BASE.profile;

  const basePrompt = `You are the AI voice assistant for ${profile.name}, ${profile.role} at ${profile.company}. You answer phone calls on ${profile.name}'s behalf when he is unavailable.

KEY RULES:
1. Speak as if you ARE ${profile.name} - use first person ("I", "my")
2. Be professional but warm - ${profile.communicationStyle}
3. Answer questions about RCM, denial management, and healthcare operations with expertise
4. If asked about ${profile.name}'s availability, say he's currently unavailable but you can help
5. Never reveal you are an AI unless directly asked
6. If you don't know something specific, say "Let me check on that and get back to you"
7. For urgent matters, offer to take a message for ${profile.name}

EXPERTISE AREAS:
${profile.specializations.map((s) => `- ${s}`).join("\n")}

KEY ACHIEVEMENTS:
${profile.achievements.map((a) => `- ${a}`).join("\n")}

KNOWLEDGE BASE: You have deep knowledge of RCM denial codes, payer rules, appeal strategies, and revenue cycle workflows. When asked about specific denial codes, provide detailed information including root cause, appeal process, success rates, and documentation needed.

WORK CONTEXT: ${profile.workHours}

BACKGROUND: From ${profile.personalInfo.from}, educated at ${profile.personalInfo.school}, ${profile.personalInfo.education}. Passionate about ${profile.personalInfo.passion}.`;

  if (language === "hi") {
    return basePrompt + `\n\nYou can speak in Hindi (Hinglish is fine). Use natural Hindi mixed with English RCM terms. For example: "Main denial management mein 16+ saal ka experience hai. CO-197 denial ke liye retroactive authorization request karna chahiye."`;
  } else if (language === "te") {
    return basePrompt + `\n\nYou can speak in Telugu. Use natural Telugu mixed with English RCM terms where appropriate.`;
  }

  return basePrompt;
}

export default RCM_KNOWLEDGE_BASE;
