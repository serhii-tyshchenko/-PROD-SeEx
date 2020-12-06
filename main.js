const INPUT = document.getElementById('input-data');
const OUTPUT = document.getElementById('output-data');

const EXTRACT_TAGS_CB = document.querySelector('#js-extract-tags');
const EXTRACT_IDS_CB = document.querySelector('#js-extract-ids');
const EXTRACT_CLASSES_CB = document.querySelector('#js-extract-classes');

const EXTRACT_BTN = document.getElementById('extract-btn');
const COPY_BTN = document.getElementById('copy-btn');

function extractSelectors() {
    const input = INPUT.value;
    const extractTags = EXTRACT_TAGS_CB.checked;
    const extractIds = EXTRACT_IDS_CB.checked;
    const extractClasses = EXTRACT_CLASSES_CB.checked;

    const regexTag = /(?<=<)[a-z0-9]+(?=(\s|>))/gm;
    const regexId = /(?<=id=")[\sa-z0-9_-]+(?=")/gm;
    const regexClass = /(?<=class=")[\sa-z0-9_-]+(?=")/gm;

    const dataTags = extractTags
        ? filterTags(getMatches(input, regexTag, ''))
        : [];
    const dataIds = extractIds ? getMatches(input, regexId, '#') : [];
    // TODO Extract combined classes. Ex. "btn btn--primary"
    const dataClasses = extractClasses
        ? getMatches(input, regexClass, '.')
        : [];

    const result = [...dataTags, ...dataIds, ...dataClasses];

    OUTPUT.disabled = false;
    OUTPUT.value = result.join('\n');
}
function getMatches(string, regex, selector) {
    return [...new Set(string.match(regex))].map(
        (item) => `${selector}${item} {}`
    );
}
function filterTags(data) {
    const exclusions = [
        'head {}',
        'meta {}',
        'title {}',
        'link {}',
        'script {}',
        'style {}',
        'noscript {}'
    ];
    return data.filter((item) => !exclusions.includes(item));
}
function copyResults() {
    OUTPUT.select();
    OUTPUT.setSelectionRange(0, 99999);
    document.execCommand('copy');
}

EXTRACT_BTN.addEventListener('click', extractSelectors);
COPY_BTN.addEventListener('click', copyResults);
