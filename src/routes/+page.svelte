<svelte:head>
	<title>NutriCalc — Nutrition Calculator</title>
	<meta
		name="description"
		content="A private, offline nutrition calculator for BMI, ideal body weight, and daily energy needs."
	/>
	<meta name="theme-color" content="#f5f8f5" />
	<link rel="manifest" href="/manifest.json" />
	<link rel="icon" href="/icons/icon-192.png" type="image/png" />
</svelte:head>

<main class="app-shell">
	<header class="topbar">
		<a class="brand" href="/" aria-label="NutriCalc home">
			<span class="brand-mark" aria-hidden="true">
				<svg viewBox="0 0 40 40" fill="none">
					<rect width="40" height="40" rx="13" fill="currentColor" />
					<path d="M20 9v22M9 20h22" stroke="white" stroke-width="3" stroke-linecap="round" />
					<circle cx="20" cy="20" r="7" stroke="white" stroke-width="2" />
				</svg>
			</span>
			<span class="brand-copy">
				<strong>nutri<span>calc</span></strong>
				<small data-i18n="brandTag">Your health, in balance</small>
			</span>
		</a>
		<div class="top-actions">
			<span class="connection-pill" id="connection-status" role="status">
				<span class="status-dot" aria-hidden="true"></span>
				<span id="connection-label">Online</span>
			</span>
			<button class="language-button" id="language-toggle" type="button" aria-label="Switch language">
				<span aria-hidden="true">文</span>
				<span id="language-label">العربية</span>
			</button>
		</div>
	</header>

	<section class="hero" aria-labelledby="page-title">
		<div class="hero-copy">
			<div class="eyebrow"><span class="eyebrow-line"></span><span data-i18n="eyebrow">WELLNESS, MADE PERSONAL</span></div>
			<h1 id="page-title" data-i18n="headline">A clearer picture<br />of your <em>wellbeing.</em></h1>
			<p data-i18n="intro">Understand your body with simple, thoughtful estimates — calculated privately on your device.</p>
		</div>
		<div class="hero-art" aria-hidden="true">
			<div class="art-orbit orbit-one"></div>
			<div class="art-orbit orbit-two"></div>
			<div class="art-core"><svg viewBox="0 0 64 64" fill="none"><path d="M32 51S12 39 12 23a11 11 0 0 1 20-6 11 11 0 0 1 20 6c0 16-20 28-20 28Z" fill="currentColor" opacity=".12"/><path d="M32 49S14 38 14 24a9 9 0 0 1 16-5 2 2 0 0 0 4 0 9 9 0 0 1 16 5c0 14-18 25-18 25Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M19 32h8l4-7 5 15 4-8h6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
			<span class="art-leaf leaf-one"></span><span class="art-leaf leaf-two"></span>
			<div class="art-note"><span class="note-icon">✦</span><span data-i18n="privateNote">Private by design</span></div>
		</div>
	</section>

	<div class="content-grid">
		<section class="panel form-panel" aria-labelledby="form-title">
			<div class="panel-heading">
				<div>
					<span class="section-kicker" data-i18n="step">YOUR DETAILS</span>
					<h2 id="form-title" data-i18n="formTitle">Let’s get to know you</h2>
					<p data-i18n="formIntro">A few details help us make your estimates more personal.</p>
				</div>
				<span class="heading-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.7"/><path d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
				</span>
			</div>

			<form id="calculator-form" novalidate>
				<div class="form-grid">
					<div class="field field-wide">
						<label for="name" data-i18n="nameLabel">Name <span class="optional" data-i18n="optional">(optional)</span></label>
						<input id="name" name="name" type="text" autocomplete="name" maxlength="80" placeholder="e.g. Alex Morgan" data-i18n-placeholder="namePlaceholder" />
					</div>
					<div class="field">
						<label for="gender" data-i18n="genderLabel">Gender</label>
						<div class="select-wrap"><select id="gender" name="gender" required>
							<option value="" data-i18n="selectGender">Select gender</option>
							<option value="male" data-i18n="male">Male</option>
							<option value="female" data-i18n="female">Female</option>
						</select><span class="select-chevron" aria-hidden="true">⌄</span></div>
						<span class="field-error" id="gender-error" aria-live="polite"></span>
					</div>
					<div class="field">
						<label for="age" data-i18n="ageLabel">Age</label>
						<div class="input-unit"><input id="age" name="age" type="number" inputmode="numeric" min="1" max="120" step="1" placeholder="e.g. 28" required /><span data-i18n="years">years</span></div>
						<span class="field-error" id="age-error" aria-live="polite"></span>
					</div>
					<div class="field field-wide">
						<label for="activity" data-i18n="activityLabel">Activity level</label>
						<div class="select-wrap"><select id="activity" name="activity" required>
							<option value="" data-i18n="selectActivity">Choose your activity level</option>
							<option value="sedentary" data-i18n="sedentary">Sedentary · little or no exercise</option>
							<option value="light" data-i18n="light">Lightly active · 1–3 days/week</option>
							<option value="moderate" data-i18n="moderate">Moderately active · 3–5 days/week</option>
							<option value="very" data-i18n="very">Very active · 6–7 days/week</option>
							<option value="extra" data-i18n="extra">Extra active · intense daily exercise</option>
						</select><span class="select-chevron" aria-hidden="true">⌄</span></div>
						<span class="field-error" id="activity-error" aria-live="polite"></span>
					</div>
					<div class="field">
						<label for="height" data-i18n="heightLabel">Height</label>
						<div class="input-unit"><input id="height" name="height" type="number" inputmode="decimal" min="1" max="300" step="any" placeholder="e.g. 170" required /><span>cm</span></div>
						<span class="field-error" id="height-error" aria-live="polite"></span>
					</div>
					<div class="field">
						<label for="weight" data-i18n="weightLabel">Weight</label>
						<div class="input-unit"><input id="weight" name="weight" type="number" inputmode="decimal" min="1" max="700" step="any" placeholder="e.g. 68" required /><span>kg</span></div>
						<span class="field-error" id="weight-error" aria-live="polite"></span>
					</div>
				</div>
				<div class="form-message" id="form-message" role="alert" aria-live="assertive"></div>
				<div class="form-actions">
					<button class="button button-primary" type="submit">
						<span data-i18n="calculate">Calculate my results</span>
						<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</button>
					<button class="button button-quiet" type="reset" id="reset-button" data-i18n="reset">Reset</button>
				</div>
				<p class="privacy-hint"><svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="3.5" y="7.5" width="11" height="8" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M6 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg><span data-i18n="privacyHint">Your details stay on this device and are never sent anywhere.</span></p>
			</form>
		</section>

		<aside class="side-column">
			<section class="panel insight-panel">
				<div class="insight-top">
					<span class="insight-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.7"/></svg></span>
					<span class="insight-label" data-i18n="goodToKnow">A GENTLE REMINDER</span>
				</div>
				<h3 data-i18n="insightTitle">Numbers are just one part of your story.</h3>
				<p data-i18n="insightBody">These estimates can help you understand general trends. Your wellbeing is about so much more than a number.</p>
				<div class="insight-decoration" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
			</section>
			<section class="privacy-card">
				<span class="privacy-badge" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3 5 6v5c0 4.5 2.8 8 7 10 4.2-2 7-5.5 7-10V6l-7-3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
				<div><strong data-i18n="privacyTitle">Your privacy matters</strong><p data-i18n="privacyBody">No accounts. No cloud. Just your device.</p></div>
				<span class="privacy-check" aria-hidden="true">✓</span>
			</section>
		</aside>
	</div>

	<section class="results-section" id="results-section" hidden aria-labelledby="results-title">
		<div class="results-heading">
			<div><span class="section-kicker" data-i18n="yourSnapshot">YOUR WELLNESS SNAPSHOT</span><h2 id="results-title" data-i18n="resultsTitle">Your results</h2><p id="results-summary"></p></div>
			<div class="results-actions">
				<button class="button button-outline" id="save-record" type="button"><span aria-hidden="true">＋</span><span data-i18n="saveRecord">Save record</span></button>
				<button class="button button-outline" id="print-results" type="button"><span aria-hidden="true">⎙</span><span data-i18n="print">Print</span></button>
			</div>
		</div>
		<div class="result-grid" id="result-grid"></div>
		<p class="disclaimer" data-i18n="disclaimer">BMI, IBW and calorie estimates are not medical diagnoses or individualized medical advice. Consult a qualified healthcare professional for guidance.</p>
	</section>

	<section class="records-section" aria-labelledby="records-title">
		<div class="records-heading">
			<div><span class="section-kicker" data-i18n="storedLocally">STORED ON THIS DEVICE</span><h2 id="records-title" data-i18n="recordsTitle">Saved records</h2></div>
			<div class="records-actions">
				<button class="button button-quiet" id="view-records" type="button" data-i18n="viewRecords">View saved records</button>
				<button class="button button-quiet clear-all-button" id="clear-records" type="button" hidden data-i18n="clearAll">Clear all</button>
			</div>
		</div>
		<div class="records-list" id="records-list">
			<div class="empty-records"><span class="empty-icon" aria-hidden="true">↗</span><p data-i18n="noRecords">Your saved results will appear here. Nothing is saved unless you choose to save it.</p></div>
		</div>
	</section>

	<footer class="footer"><span>© <span id="current-year"></span> NutriCalc</span><span data-i18n="footerNote">Made for mindful, informed wellbeing.</span><span class="offline-footer"><span class="footer-dot"></span><span data-i18n="worksOffline">Works offline</span></span></footer>
</main>

<dialog class="confirm-dialog" id="confirm-dialog" aria-labelledby="dialog-title">
	<form method="dialog" class="dialog-content">
		<span class="dialog-icon" aria-hidden="true">!</span>
		<h2 id="dialog-title" data-i18n="deleteTitle">Delete saved record?</h2>
		<p data-i18n="deleteMessage">This record will be removed from this device.</p>
		<div class="dialog-actions"><button class="button button-quiet" value="cancel" data-i18n="cancel">Cancel</button><button class="button button-danger" id="confirm-delete" value="delete" data-i18n="delete">Delete</button></div>
	</form>
</dialog>
