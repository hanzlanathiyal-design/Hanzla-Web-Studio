/**
 * End-to-End Test Suite for Hanzla Web Studio
 * Verifies:
 * - API request routing & database persistence
 * - Form validation (Contact, Inquiry, Audit)
 * - Error handling & status codes
 * - Admin authentication & session verification
 * - Admin lead management (List, Filter, Update Status, Delete)
 * - Navigation anchors & CTA contracts
 */

const BASE_URL = "http://localhost:3000";

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  details?: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, suite: string, name: string, details?: string) {
  results.push({
    suite,
    name,
    passed: condition,
    details: condition ? undefined : details || "Assertion failed",
  });
  if (condition) {
    console.log(`  ✅ [PASS] ${suite} -> ${name}`);
  } else {
    console.error(`  ❌ [FAIL] ${suite} -> ${name}: ${details}`);
  }
}

async function runTests() {
  console.log("\n=======================================================");
  console.log("🚀 STARTING E2E FUNCTIONAL INTEGRATION TEST SUITE");
  console.log("=======================================================\n");

  // -------------------------------------------------------------
  // SUITE 1: Server Health & SEO
  // -------------------------------------------------------------
  console.log("\n--- Suite 1: System Health & SEO Endpoints ---");
  try {
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, "Health Check", "Status 200 OK", `Got ${healthRes.status}`);
    assert(healthData.status === "online", "Health Check", "System reports online", JSON.stringify(healthData));
    assert(Boolean(healthData.leadEngineer), "Health Check", "Lead engineer metadata present", healthData.leadEngineer);

    const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
    assert(robotsRes.status === 200, "SEO", "robots.txt accessible");

    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    assert(sitemapRes.status === 200, "SEO", "sitemap.xml accessible");
  } catch (err: any) {
    assert(false, "System Health", "Health ping failed", err.message);
  }

  // -------------------------------------------------------------
  // SUITE 2: Contact Form Validation & Error Handling
  // -------------------------------------------------------------
  console.log("\n--- Suite 2: Contact Form Validation & Error Handling ---");
  try {
    // 2.1 Empty payload should return 400 with field errors
    const emptyRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const emptyData = await emptyRes.json();
    assert(emptyRes.status === 400, "Contact Validation", "Rejects empty submission with 400", `Got ${emptyRes.status}`);
    assert(emptyData.success === false, "Contact Validation", "Success flag is false on error");
    assert(Array.isArray(emptyData.errors) && emptyData.errors.length >= 4, "Contact Validation", "Returns field-level errors list", JSON.stringify(emptyData.errors));

    // 2.2 Malformed email format rejection
    const badEmailRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        businessName: "Acme Corp",
        email: "not-a-valid-email",
        message: "Need a high performance website.",
      }),
    });
    const badEmailData = await badEmailRes.json();
    assert(badEmailRes.status === 400, "Contact Validation", "Rejects malformed email with 400", `Got ${badEmailRes.status}`);
    const emailError = badEmailData.errors?.find((e: any) => e.field === "email");
    assert(Boolean(emailError), "Contact Validation", "Specific email validation error returned", JSON.stringify(badEmailData));
  } catch (err: any) {
    assert(false, "Contact Validation", "Contact validation test error", err.message);
  }

  // -------------------------------------------------------------
  // SUITE 3: Contact Form Database Insertion & Success State
  // -------------------------------------------------------------
  console.log("\n--- Suite 3: Database Insertion & Success State ---");
  let createdLeadId = "";
  try {
    const validPayload = {
      name: "Victoria Sterling",
      businessName: "Sterling & Croft Legal Partners",
      email: "v.sterling@sterlingcroft.com",
      phone: "+1 (555) 890-1234",
      businessType: "Professional & Legal Services",
      projectType: "High-Credibility Partner Portal",
      budget: "$15,000 - $25,000",
      message: "We need an ultra-fast, WCAG AA compliant platform showcasing our practice areas.",
    };

    const submitRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload),
    });
    const submitData = await submitRes.json();

    assert(submitRes.status === 201, "Contact Submission", "Status 201 Created on valid submission", `Got ${submitRes.status}`);
    assert(submitData.success === true, "Contact Submission", "Returns success: true");
    assert(Boolean(submitData.referenceId), "Contact Submission", "Generates unique referenceId", submitData.referenceId);
    assert(submitData.lead?.email === validPayload.email, "Contact Submission", "Lead record email matches input", submitData.lead?.email);
    assert(submitData.lead?.status === "NEW", "Contact Submission", "Initial lead status is NEW", submitData.lead?.status);

    createdLeadId = submitData.referenceId;
  } catch (err: any) {
    assert(false, "Contact Submission", "Contact submission test error", err.message);
  }

  // -------------------------------------------------------------
  // SUITE 4: Inquiry API & Audit API Integration
  // -------------------------------------------------------------
  console.log("\n--- Suite 4: Inquiry API & Audit Tool Diagnostic API ---");
  try {
    // 4.1 Inquiry submission
    const inqRes = await fetch(`${BASE_URL}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Julian Mercer",
        email: "julian@apexfintech.io",
        company: "Apex Fintech Group",
        industry: "Fintech & SaaS",
        projectType: "Full Web Application Platform",
        budget: "$20,000+",
        timeline: "8 weeks",
        message: "Building an enterprise analytics dashboard with real-time charting.",
      }),
    });
    const inqData = await inqRes.json();
    assert(inqRes.status === 201, "Inquiry API", "Status 201 Created", `Got ${inqRes.status}`);
    assert(Boolean(inqData.referenceId), "Inquiry API", "Inquiry reference ID generated", inqData.referenceId);

    // 4.2 Audit tool API
    const auditRes = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: "https://mytestclient.com",
        industry: "E-Commerce & Retail",
        primaryGoal: "Increase Conversions & Sales",
      }),
    });
    const auditData = await auditRes.json();
    assert(auditRes.status === 200, "Audit API", "Status 200 OK", `Got ${auditRes.status}`);
    assert(typeof auditData.audit?.score?.overall === "number", "Audit API", "Computes overall benchmark score", `${auditData.audit?.score?.overall}`);
    assert(Array.isArray(auditData.audit?.keyFindings), "Audit API", "Returns diagnostic findings list");
  } catch (err: any) {
    assert(false, "Inquiry/Audit API", "Inquiry or audit test error", err.message);
  }

  // -------------------------------------------------------------
  // SUITE 5: Admin Authentication (Security & Error Handling)
  // -------------------------------------------------------------
  console.log("\n--- Suite 5: Admin Authentication ---");
  let adminJwtToken = "";
  try {
    // 5.1 Rejected with 401 on incorrect password
    const badLoginRes = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "hanzlanathiyal@gmail.com",
        password: "IncorrectPassword123!",
      }),
    });
    const badLoginData = await badLoginRes.json();
    assert(badLoginRes.status === 401, "Admin Auth", "Rejects bad credentials with 401", `Got ${badLoginRes.status}`);
    assert(badLoginData.success === false, "Admin Auth", "Returns success: false on failed auth");

    // 5.2 Protected endpoint without token rejected with 401
    const unauthRes = await fetch(`${BASE_URL}/api/admin/leads`);
    assert(unauthRes.status === 401, "Admin Auth", "Blocks unauthenticated leads query with 401");

    // 5.3 Login with correct credentials
    const validLoginRes = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "hanzlanathiyal@gmail.com",
        password: "StudioLeadPortal2026!",
      }),
    });
    const validLoginData = await validLoginRes.json();
    assert(validLoginRes.status === 200, "Admin Auth", "Login successful with 200 OK", `Got ${validLoginRes.status}`);
    assert(Boolean(validLoginData.token), "Admin Auth", "Issues signed JWT token");
    assert(validLoginData.admin?.email === "hanzlanathiyal@gmail.com", "Admin Auth", "Identifies correct admin email");

    adminJwtToken = validLoginData.token;

    // 5.4 Verify session via /api/admin/auth/me
    const meRes = await fetch(`${BASE_URL}/api/admin/auth/me`, {
      headers: { Authorization: `Bearer ${adminJwtToken}` },
    });
    const meData = await meRes.json();
    assert(meRes.status === 200, "Admin Auth", "Session verified via /api/admin/auth/me", `Got ${meRes.status}`);
    assert(meData.admin?.email === "hanzlanathiyal@gmail.com", "Admin Auth", "Token payload intact");
  } catch (err: any) {
    assert(false, "Admin Auth", "Admin authentication test error", err.message);
  }

  // -------------------------------------------------------------
  // SUITE 6: Admin Lead Management (Read, Filter, Update, Delete)
  // -------------------------------------------------------------
  console.log("\n--- Suite 6: Admin Lead Management ---");
  try {
    // 6.1 Query leads list
    const leadsRes = await fetch(`${BASE_URL}/api/admin/leads`, {
      headers: { Authorization: `Bearer ${adminJwtToken}` },
    });
    const leadsData = await leadsRes.json();
    assert(leadsRes.status === 200, "Admin Leads", "Fetches lead list with 200 OK");
    assert(Array.isArray(leadsData.leads), "Admin Leads", "Returns leads array");

    // Check that our newly inserted lead from Suite 3 exists!
    const foundLead = leadsData.leads.find((l: any) => l.id === createdLeadId || l.email === "v.sterling@sterlingcroft.com");
    assert(Boolean(foundLead), "Admin Leads", "Newly submitted contact lead is present in database query", `Found ID: ${foundLead?.id}`);

    const targetLeadId = foundLead?.id || createdLeadId;

    // 6.2 Update Lead Status to "CONTACTED"
    const updateRes1 = await fetch(`${BASE_URL}/api/admin/leads/${targetLeadId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "CONTACTED" }),
    });
    const updateData1 = await updateRes1.json();
    assert(updateRes1.status === 200, "Admin Leads", "Updates lead status to CONTACTED", `Got ${updateRes1.status}`);
    assert(updateData1.lead?.status === "CONTACTED", "Admin Leads", "Status persisted as CONTACTED");

    // 6.3 Update Lead Status to "QUALIFIED"
    const updateRes2 = await fetch(`${BASE_URL}/api/admin/leads/${targetLeadId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "QUALIFIED" }),
    });
    const updateData2 = await updateRes2.json();
    assert(updateRes2.status === 200, "Admin Leads", "Updates lead status to QUALIFIED", `Got ${updateRes2.status}`);
    assert(updateData2.lead?.status === "QUALIFIED", "Admin Leads", "Status persisted as QUALIFIED");

    // 6.4 Search filter
    const searchRes = await fetch(`${BASE_URL}/api/admin/leads?search=Sterling`, {
      headers: { Authorization: `Bearer ${adminJwtToken}` },
    });
    const searchData = await searchRes.json();
    assert(searchData.leads.some((l: any) => l.businessName.includes("Sterling")), "Admin Leads", "Search by business name returns matching lead");

    // 6.5 Delete Lead
    const deleteRes = await fetch(`${BASE_URL}/api/admin/leads/${targetLeadId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${adminJwtToken}` },
    });
    const deleteData = await deleteRes.json();
    assert(deleteRes.status === 200, "Admin Leads", "Deletes/archives lead successfully", `Got ${deleteRes.status}`);
    assert(deleteData.success === true, "Admin Leads", "Delete response indicates success");
  } catch (err: any) {
    assert(false, "Admin Leads", "Lead management test error", err.message);
  }

  // -------------------------------------------------------------
  // SUITE 7: Frontend Contracts & Navigation Structure Check
  // -------------------------------------------------------------
  console.log("\n--- Suite 7: Frontend Page Navigation & Structural Contract ---");
  try {
    const pageRes = await fetch(`${BASE_URL}/`);
    const pageHtml = await pageRes.text();
    assert(pageRes.status === 200, "Frontend SPA", "Main index.html returns 200 OK");
    assert(pageHtml.includes("Hanzla Web Studio"), "Frontend SPA", "Title/Brand contained in served markup");
    assert(pageHtml.includes("root"), "Frontend SPA", "Root mounting container present");
  } catch (err: any) {
    assert(false, "Frontend SPA", "Failed to fetch index.html", err.message);
  }

  // -------------------------------------------------------------
  // TEST SUMMARY
  // -------------------------------------------------------------
  console.log("\n=======================================================");
  console.log("📊 TEST EXECUTION SUMMARY");
  console.log("=======================================================");
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;

  console.log(`Total Assertions Tested: ${total}`);
  console.log(`Passed:                  ${passed}`);
  console.log(`Failed:                  ${failed}`);
  console.log("=======================================================\n");

  if (failed > 0) {
    console.error("❌ Some tests failed. Inspect the logs above.");
    process.exit(1);
  } else {
    console.log("🎉 ALL FUNCTIONAL TESTS PASSED SUCCESSFULLY!\n");
    process.exit(0);
  }
}

runTests();
