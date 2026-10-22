/* Edit activity multipliers here; the labels and calculations use these same values. */
const ACTIVITY_FACTORS = Object.freeze({
	sedentary: 1.2,
	light: 1.375,
	moderate: 1.55,
	very: 1.725,
	extra: 1.9
});

const STORAGE_KEY = 'nutricalc.saved-records.v1';
const LANGUAGE_KEY = 'nutricalc.language.v1';

const messages = {
	en: {
		brandTag: 'Your health, in balance', eyebrow: 'WELLNESS, MADE PERSONAL',
		headline: 'A clearer picture<br>of your <em>wellbeing.</em>',
		intro: 'Understand your body with simple, thoughtful estimates — calculated privately on your device.',
		privateNote: 'Private by design', step: 'YOUR DETAILS', formTitle: 'Let’s get to know you',
		formIntro: 'A few details help us make your estimates more personal.', nameLabel: 'Name <span class="optional">(optional)</span>',
		namePlaceholder: 'e.g. Alex Morgan', genderLabel: 'Gender', selectGender: 'Select gender', male: 'Male', female: 'Female',
		ageLabel: 'Age', years: 'years', activityLabel: 'Activity level', selectActivity: 'Choose your activity level',
		sedentary: 'Sedentary · little or no exercise', light: 'Lightly active · 1–3 days/week',
		moderate: 'Moderately active · 3–5 days/week', very: 'Very active · 6–7 days/week',
		extra: 'Extra active · intense daily exercise', heightLabel: 'Height', weightLabel: 'Weight',
		calculate: 'Calculate my results', reset: 'Reset', privacyHint: 'Your details stay on this device and are never sent anywhere.',
		goodToKnow: 'A GENTLE REMINDER', insightTitle: 'Numbers are just one part of your story.',
		insightBody: 'These estimates can help you understand general trends. Your wellbeing is about so much more than a number.',
		privacyTitle: 'Your privacy matters', privacyBody: 'No accounts. No cloud. Just your device.',
		yourSnapshot: 'YOUR WELLNESS SNAPSHOT', resultsTitle: 'Your results', saveRecord: 'Save record', print: 'Print',
		disclaimer: 'BMI, IBW and calorie estimates are not medical diagnoses or individualized medical advice. Consult a qualified healthcare professional for guidance.',
		storedLocally: 'STORED ON THIS DEVICE', recordsTitle: 'Saved records', clearAll: 'Clear all',
		exportExcel: 'Export Excel',
		viewRecords: 'View saved records', hideRecords: 'Hide saved records',
		noRecords: 'Your saved results will appear here. Nothing is saved unless you choose to save it.',
		footerNote: 'Made for mindful, informed wellbeing.', worksOffline: 'Works offline', online: 'Online', offline: 'Offline',
		required: 'Please complete this field.', invalidAge: 'Enter an age from 1 to 120 years.',
		invalidHeight: 'Enter a valid height greater than zero (up to 300 cm).',
		invalidWeight: 'Enter a valid weight greater than zero (up to 700 kg).',
		invalidNumber: 'Enter a valid number greater than zero.', formError: 'Please check the highlighted fields.',
		saveSuccess: 'Results saved on this device.', saveError: 'Could not save this record. Check device storage settings.',
		loadError: 'Saved records could not be read from this device.', deleteTitle: 'Delete saved record?',
		deleteMessage: 'This record will be removed from this device.', cancel: 'Cancel', delete: 'Delete',
		clearTitle: 'Clear all saved records?', clearMessage: 'All saved records will be removed from this device.',
		recordDeleted: 'Saved record deleted.', recordsCleared: 'All saved records cleared.',
		bmi: 'Body mass index', ibw: 'Ideal body weight', bmr: 'Basal metabolic rate',
		tdee: 'Estimated daily energy', profile: 'Your details', activityResult: 'Activity level',
		multiplier: 'Activity factor', bmiCategory: 'BMI category', name: 'Name', gender: 'Gender', age: 'Age',
		height: 'Height', weight: 'Weight', maleValue: 'Male', femaleValue: 'Female',
		underweight: 'Underweight', normal: 'Normal weight', overweight: 'Overweight',
		obese: 'Obese', severe: 'Severe obesity', kcalDay: 'kcal / day', savedAt: 'Saved',
		deleteRecord: 'Delete record', kcal: 'kcal/day', noName: 'Personal results',
		approximation: 'Estimates only', weightUnit: 'kg', ageUnit: 'years', heightUnit: 'cm',
		noValue: 'Not provided', savedRecordsFile: 'NutriCalc saved records',
		printTitle: 'NutriCalc results', savedList: 'Saved results', errorOffline: 'App shell is not cached yet. Reconnect once, then reload to finish offline setup.'
	},
	ar: {
		brandTag: 'صحتك في توازن', eyebrow: 'العافية، بأسلوب يناسبك',
		headline: 'صورة أوضح<br>عن <em>عافيتك.</em>',
		intro: 'افهم جسمك بتقديرات بسيطة ومدروسة — تُحسب بأمان على جهازك.',
		privateNote: 'خصوصيتك أولويتنا', step: 'بياناتك', formTitle: 'لنتعرف عليك',
		formIntro: 'بعض التفاصيل تساعدنا على تقديم تقديرات أقرب إليك.', nameLabel: 'الاسم <span class="optional">(اختياري)</span>',
		namePlaceholder: 'مثال: أحمد محمد', genderLabel: 'الجنس', selectGender: 'اختر الجنس', male: 'ذكر', female: 'أنثى',
		ageLabel: 'العمر', years: 'سنة', activityLabel: 'مستوى النشاط', selectActivity: 'اختر مستوى النشاط',
		sedentary: 'خامل · نشاط قليل أو معدوم', light: 'نشاط خفيف · ١–٣ أيام أسبوعيًا',
		moderate: 'نشاط متوسط · ٣–٥ أيام أسبوعيًا', very: 'نشاط مرتفع · ٦–٧ أيام أسبوعيًا',
		extra: 'نشاط مكثف · تمارين يومية قوية', heightLabel: 'الطول', weightLabel: 'الوزن',
		calculate: 'احسب النتائج', reset: 'إعادة ضبط', privacyHint: 'تبقى بياناتك على هذا الجهاز ولا تُرسل إلى أي مكان.',
		goodToKnow: 'تذكير لطيف', insightTitle: 'الأرقام جزء واحد فقط من قصتك.',
		insightBody: 'تساعدك هذه التقديرات على فهم الاتجاهات العامة. عافيتك أوسع بكثير من مجرد رقم.',
		privacyTitle: 'خصوصيتك تهمنا', privacyBody: 'لا حسابات. لا تخزين سحابي. على جهازك فقط.',
		yourSnapshot: 'ملخص العافية', resultsTitle: 'نتائجك', saveRecord: 'حفظ النتيجة', print: 'طباعة',
		disclaimer: 'مؤشر كتلة الجسم والوزن المثالي وتقديرات السعرات ليست تشخيصًا طبيًا أو نصيحة طبية شخصية. استشر مختصًا صحيًا مؤهلًا.',
		storedLocally: 'محفوظة على هذا الجهاز', recordsTitle: 'النتائج المحفوظة', clearAll: 'حذف الكل',
		exportExcel: 'تصدير إلى Excel',
		viewRecords: 'عرض النتائج المحفوظة', hideRecords: 'إخفاء النتائج المحفوظة',
		noRecords: 'ستظهر نتائجك المحفوظة هنا. لن يتم حفظ أي شيء إلا باختيارك.',
		footerNote: 'لرفاهية واعية ومستنيرة.', worksOffline: 'يعمل دون اتصال', online: 'متصل', offline: 'دون اتصال',
		required: 'يرجى استكمال هذا الحقل.', invalidAge: 'أدخل عمرًا بين ١ و١٢٠ سنة.',
		invalidHeight: 'أدخل طولًا صحيحًا أكبر من صفر (بحد أقصى ٣٠٠ سم).',
		invalidWeight: 'أدخل وزنًا صحيحًا أكبر من صفر (بحد أقصى ٧٠٠ كجم).',
		invalidNumber: 'أدخل رقمًا صحيحًا أكبر من صفر.', formError: 'يرجى التحقق من الحقول المحددة.',
		saveSuccess: 'تم حفظ النتائج على هذا الجهاز.', saveError: 'تعذر حفظ النتيجة. تحقق من إعدادات تخزين الجهاز.',
		loadError: 'تعذرت قراءة النتائج المحفوظة من هذا الجهاز.', deleteTitle: 'حذف النتيجة المحفوظة؟',
		deleteMessage: 'ستُحذف هذه النتيجة من هذا الجهاز.', cancel: 'إلغاء', delete: 'حذف',
		clearTitle: 'حذف جميع النتائج المحفوظة؟', clearMessage: 'ستُحذف كل النتائج المحفوظة من هذا الجهاز.',
		recordDeleted: 'تم حذف النتيجة المحفوظة.', recordsCleared: 'تم حذف جميع النتائج المحفوظة.',
		bmi: 'مؤشر كتلة الجسم', ibw: 'الوزن المثالي', bmr: 'معدل الأيض الأساسي',
		tdee: 'الاحتياج اليومي التقديري', profile: 'بياناتك', activityResult: 'مستوى النشاط',
		multiplier: 'معامل النشاط', bmiCategory: 'فئة مؤشر كتلة الجسم', name: 'الاسم', gender: 'الجنس', age: 'العمر',
		height: 'الطول', weight: 'الوزن', maleValue: 'ذكر', femaleValue: 'أنثى',
		underweight: 'نقص الوزن', normal: 'وزن طبيعي', overweight: 'زيادة الوزن',
		obese: 'سمنة', severe: 'سمنة مفرطة', kcalDay: 'سعرة / يوم', savedAt: 'تاريخ الحفظ',
		deleteRecord: 'حذف النتيجة', kcal: 'سعرة/يوم', noName: 'نتائج شخصية',
		approximation: 'تقديرات تقريبية', weightUnit: 'كجم', ageUnit: 'سنة', heightUnit: 'سم',
		noValue: 'غير متوفر', savedRecordsFile: 'نتائج NutriCalc المحفوظة',
		printTitle: 'نتائج NutriCalc', savedList: 'النتائج المحفوظة',
		errorOffline: 'لم يتم تخزين التطبيق بعد. اتصل بالإنترنت مرة واحدة ثم أعد التحميل لإكمال الإعداد.'
	}
};

let language = 'en';
let currentResult = null;
let deleteTarget = null;
let recordsVisible = true;

const $ = (selector, root = document) => root.querySelector(selector);
const form = $('#calculator-form');
const formMessage = $('#form-message');
const resultsSection = $('#results-section');
const dialog = $('#confirm-dialog');

function translate(key) {
	return messages[language][key] ?? messages.en[key] ?? key;
}

function setLanguage(nextLanguage) {
	language = nextLanguage;
	document.documentElement.lang = language;
	document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
	document.querySelectorAll('[data-i18n]').forEach((element) => {
		const value = translate(element.dataset.i18n);
		if (element.dataset.i18n === 'headline' || element.dataset.i18n === 'nameLabel') {
			element.innerHTML = value;
		} else {
			element.textContent = value;
		}
	});
	document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
		element.placeholder = translate(element.dataset.i18nPlaceholder);
	});
	$('#language-label').textContent = language === 'en' ? 'العربية' : 'English';
	$('#language-toggle').setAttribute('aria-label', language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية');
	$('#connection-label').textContent = navigator.onLine ? translate('online') : translate('offline');
	$('#view-records').textContent = translate(recordsVisible ? 'hideRecords' : 'viewRecords');
	$('#current-year').textContent = new Date().getFullYear();
	try {
		localStorage.setItem(LANGUAGE_KEY, language);
	} catch (error) {
		console.warn('Could not store language preference.', error);
	}
	if (currentResult) renderResults(currentResult);
	renderRecords();
}

function formatNumber(value, digits = 0) {
	return new Intl.NumberFormat(language === 'ar' ? 'ar' : 'en', {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	}).format(value);
}

function activityLabel(key) {
	return translate(key);
}

function bmiCategory(bmi) {
	if (bmi < 18) return 'underweight';
	if (bmi < 25) return 'normal';
	if (bmi < 30) return 'overweight';
	if (bmi < 40) return 'obese';
	return 'severe';
}

function compute(values) {
	const heightM = values.height / 100;
	const bmi = values.weight / (heightM * heightM);
	const ibw = ((values.height - 152) / 2.54) * (values.gender === 'male' ? 2.7 : 2.2)
		+ (values.gender === 'male' ? 48 : 45);
	const bmr = 10 * values.weight + 6.25 * values.height - 5 * values.age
		+ (values.gender === 'male' ? 5 : -161);
	const factor = ACTIVITY_FACTORS[values.activity];
	return {
		...values,
		bmi,
		category: bmiCategory(bmi),
		ibw,
		bmr,
		factor,
		tdee: bmr * factor
	};
}

function validateForm() {
	const fields = ['gender', 'age', 'activity', 'height', 'weight'];
	let firstInvalid = null;
	let valid = true;
	formMessage.textContent = '';

	fields.forEach((name) => {
		const input = form.elements.namedItem(name);
		const error = $(`#${name}-error`);
		let message = '';
		if (!input.value.trim()) {
			message = translate('required');
		} else if (name === 'age') {
			const value = Number(input.value);
			if (!Number.isFinite(value) || !Number.isInteger(value) || value <= 0 || value > 120) {
				message = translate('invalidAge');
			}
		} else if (name === 'height') {
			const value = Number(input.value);
			if (!Number.isFinite(value) || value <= 0 || value > 300) message = translate('invalidHeight');
		} else if (name === 'weight') {
			const value = Number(input.value);
			if (!Number.isFinite(value) || value <= 0 || value > 700) message = translate('invalidWeight');
		} else if (name === 'gender' && !['male', 'female'].includes(input.value)) {
			message = translate('required');
		} else if (name === 'activity' && !(input.value in ACTIVITY_FACTORS)) {
			message = translate('required');
		}
		error.textContent = message;
		input.setAttribute('aria-invalid', String(Boolean(message)));
		if (message) {
			valid = false;
			firstInvalid ||= input;
		}
	});

	if (!valid) {
		formMessage.textContent = translate('formError');
		firstInvalid?.focus();
	}
	return valid;
}

function escapeHtml(value) {
	return String(value).replace(/[&<>"']/g, (character) => ({
		'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
	})[character]);
}

function escapeXml(value) {
	return String(value)
		.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
		.replace(/[&<>"']/g, (character) => ({
			'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
		})[character]);
}

function renderResults(result) {
	const name = result.name.trim() || translate('noName');
	const gender = translate(result.gender === 'male' ? 'maleValue' : 'femaleValue');
	const profile = [
		`${translate('gender')}: ${gender}`,
		`${translate('age')}: ${formatNumber(result.age)} ${translate('ageUnit')}`,
		`${translate('height')}: ${formatNumber(result.height, 1)} ${translate('heightUnit')}`,
		`${translate('weight')}: ${formatNumber(result.weight, 1)} ${translate('weightUnit')}`
	].join(' · ');
	$('#results-summary').textContent = `${name} — ${profile}`;
	const cards = [
		{ key: 'bmi', icon: '◎', value: formatNumber(result.bmi, 1), unit: '', detail: translate(result.category), tone: result.category },
		{ key: 'ibw', icon: '↗', value: formatNumber(result.ibw, 1), unit: 'kg', detail: gender, tone: 'blue' },
		{ key: 'bmr', icon: '◌', value: formatNumber(Math.round(result.bmr)), unit: translate('kcalDay'), detail: translate('approximation'), tone: 'sand' },
		{ key: 'tdee', icon: '✧', value: formatNumber(Math.round(result.tdee)), unit: translate('kcalDay'), detail: `${activityLabel(result.activity)} · ×${formatNumber(result.factor, 3)}`, tone: 'green' }
	];
	$('#result-grid').innerHTML = cards.map((card) => `
		<article class="result-card result-${card.tone}">
			<div class="result-card-top"><span class="result-icon" aria-hidden="true">${card.icon}</span><span class="result-label">${translate(card.key)}</span></div>
			<strong class="result-value">${card.value}<small>${card.unit}</small></strong>
			<span class="result-detail">${card.detail}</span>
		</article>
	`).join('');
	resultsSection.hidden = false;
}

function readRecords() {
	try {
		const value = localStorage.getItem(STORAGE_KEY);
		const parsed = value ? JSON.parse(value) : [];
		if (!Array.isArray(parsed)) throw new TypeError('Saved records are not a list.');
		return parsed;
	} catch (error) {
		console.error('Could not read saved records.', error);
		formMessage.textContent = translate('loadError');
		return [];
	}
}

function storeRecords(records) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function renderRecords() {
	const records = readRecords();
	const list = $('#records-list');
	$('#clear-records').hidden = records.length === 0;
	$('#export-records').hidden = records.length === 0;
	if (!records.length) {
		list.innerHTML = `<div class="empty-records"><span class="empty-icon" aria-hidden="true">↗</span><p>${translate('noRecords')}</p></div>`;
		return;
	}
	list.innerHTML = records.map((record) => {
		const savedAt = new Date(record.createdAt);
		const dateText = Number.isNaN(savedAt.getTime()) ? translate('noValue') : new Intl.DateTimeFormat(language === 'ar' ? 'ar' : 'en', {
			dateStyle: 'medium', timeStyle: 'short'
		}).format(savedAt);
		const person = record.name?.trim() || translate('noName');
		const details = [
			['gender', translate(record.gender === 'male' ? 'maleValue' : 'femaleValue')],
			['age', `${formatNumber(record.age)} ${translate('ageUnit')}`],
			['activityResult', translate(record.activity)],
			['multiplier', `×${formatNumber(record.factor, 3)}`],
			['height', `${formatNumber(record.height, 1)} ${translate('heightUnit')}`],
			['weight', `${formatNumber(record.weight, 1)} ${translate('weightUnit')}`],
			['bmi', formatNumber(record.bmi, 1)],
			['bmiCategory', translate(record.category)],
			['ibw', `${formatNumber(record.ibw, 1)} ${translate('weightUnit')}`],
			['bmr', `${formatNumber(Math.round(record.bmr))} ${translate('kcal')}`],
			['tdee', `${formatNumber(Math.round(record.tdee))} ${translate('kcal')}`]
		];
		return `<article class="saved-record">
			<div class="saved-record-mark" aria-hidden="true">${record.gender === 'female' ? '♀' : '♂'}</div>
			<div class="saved-record-main"><strong>${escapeHtml(person)}</strong><time datetime="${escapeHtml(record.createdAt || '')}">${escapeHtml(dateText)}</time></div>
			<button class="icon-button delete-record" type="button" data-record-id="${escapeHtml(record.id)}" aria-label="${translate('deleteRecord')}" title="${translate('deleteRecord')}">×</button>
			<div class="saved-record-details">${details.map(([label, value]) => `
				<div class="saved-record-detail"><span>${translate(label)}</span><strong>${escapeHtml(value)}</strong></div>
			`).join('')}</div>
		</article>`;
	}).join('');
}

function exportRecords() {
	const records = readRecords();
	if (!records.length) return;

	const columns = [
		['name', (record) => record.name?.trim() || translate('noName'), 'String'],
		['gender', (record) => translate(record.gender === 'male' ? 'maleValue' : 'femaleValue'), 'String'],
		['age', (record) => record.age, 'Number'],
		['activityResult', (record) => translate(record.activity), 'String'],
		['multiplier', (record) => record.factor, 'Number'],
		['height', (record) => record.height, 'Number'],
		['weight', (record) => record.weight, 'Number'],
		['bmi', (record) => record.bmi, 'Number'],
		['bmiCategory', (record) => translate(record.category), 'String'],
		['ibw', (record) => record.ibw, 'Number'],
		['bmr', (record) => Math.round(record.bmr), 'Number'],
		['tdee', (record) => Math.round(record.tdee), 'Number'],
		['savedAt', (record) => record.createdAt || '', 'String']
	];
	const cell = (value, type) => {
		const validNumber = type === 'Number' && Number.isFinite(value);
		const safeValue = validNumber ? value : (value ?? '');
		const safeType = validNumber ? 'Number' : 'String';
		return `<Cell><Data ss:Type="${safeType}">${escapeXml(safeValue)}</Data></Cell>`;
	};
	const rows = [
		`<Row>${columns.map(([label]) => cell(translate(label), 'String')).join('')}</Row>`,
		...records.map((record) => `<Row>${columns.map(([, getValue, type]) => cell(getValue(record), type)).join('')}</Row>`)
	];
	const workbook = `<?xml version="1.0" encoding="UTF-8"?>
		<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
			xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
			<Worksheet ss:Name="${escapeXml(translate('savedRecordsFile'))}"><Table>${rows.join('')}</Table></Worksheet>
		</Workbook>`;
	const blob = new Blob([workbook], { type: 'application/vnd.ms-excel;charset=utf-8' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = `nutricalc-saved-records-${new Date().toISOString().slice(0, 10)}.xls`;
	link.click();
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function openConfirmation(target) {
	deleteTarget = target;
	const clearing = target === 'all';
	$('#dialog-title').textContent = translate(clearing ? 'clearTitle' : 'deleteTitle');
	$('.dialog-content p').textContent = translate(clearing ? 'clearMessage' : 'deleteMessage');
	if (typeof dialog.showModal === 'function') dialog.showModal();
	else if (window.confirm(translate(clearing ? 'clearMessage' : 'deleteMessage'))) {
		performDelete();
	}
}

function performDelete() {
	try {
		if (deleteTarget === 'all') {
			storeRecords([]);
			formMessage.textContent = translate('recordsCleared');
		} else {
			storeRecords(readRecords().filter((record) => record.id !== deleteTarget));
			formMessage.textContent = translate('recordDeleted');
		}
		renderRecords();
	} catch (error) {
		console.error('Could not delete saved records.', error);
		formMessage.textContent = translate('saveError');
	}
	deleteTarget = null;
}

function updateConnectionStatus() {
	const online = navigator.onLine;
	$('#connection-status').classList.toggle('is-offline', !online);
	$('#connection-label').textContent = translate(online ? 'online' : 'offline');
}

form.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!validateForm()) return;
	const values = {
		name: form.elements.name.value,
		gender: form.elements.gender.value,
		age: Number(form.elements.age.value),
		activity: form.elements.activity.value,
		height: Number(form.elements.height.value),
		weight: Number(form.elements.weight.value)
	};
	currentResult = compute(values);
	renderResults(currentResult);
	resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

form.addEventListener('input', (event) => {
	if (event.target.matches('input, select')) {
		event.target.removeAttribute('aria-invalid');
		const error = $(`#${event.target.name}-error`);
		if (error) error.textContent = '';
		if (!form.querySelector('[aria-invalid="true"]')) formMessage.textContent = '';
	}
});

form.addEventListener('reset', () => {
	currentResult = null;
	resultsSection.hidden = true;
	formMessage.textContent = '';
	form.querySelectorAll('[aria-invalid]').forEach((input) => input.removeAttribute('aria-invalid'));
	form.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
});

$('#language-toggle').addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en'));
$('#save-record').addEventListener('click', () => {
	if (!currentResult) return;
	try {
		const record = { ...currentResult, id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`, createdAt: new Date().toISOString() };
		storeRecords([record, ...readRecords()]);
		renderRecords();
		formMessage.textContent = translate('saveSuccess');
	} catch (error) {
		console.error('Could not save the result.', error);
		formMessage.textContent = translate('saveError');
	}
});
$('#view-records').addEventListener('click', () => {
	recordsVisible = !recordsVisible;
	$('#records-list').hidden = !recordsVisible;
	$('#view-records').textContent = translate(recordsVisible ? 'hideRecords' : 'viewRecords');
});
$('#records-list').addEventListener('click', (event) => {
	const button = event.target.closest('.delete-record');
	if (button) openConfirmation(button.dataset.recordId);
});
$('#clear-records').addEventListener('click', () => openConfirmation('all'));
$('#export-records').addEventListener('click', exportRecords);
dialog.addEventListener('close', () => {
	if (dialog.returnValue === 'delete') performDelete();
});
$('#print-results').addEventListener('click', () => window.print());
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

try {
	const preferredLanguage = localStorage.getItem(LANGUAGE_KEY);
	setLanguage(preferredLanguage === 'ar' ? 'ar' : 'en');
} catch (error) {
	console.warn('Could not read language preference.', error);
	setLanguage('en');
}
renderRecords();
updateConnectionStatus();

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js')
			.catch((error) => {
				console.error('Service worker registration failed.', error);
				formMessage.textContent = translate('errorOffline');
			});
	});
}
