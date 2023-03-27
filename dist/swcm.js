const baseUrl = 'https://p3-passport.byteimg.com/img';
const redirectUrl = `${baseUrl}/mosaic-legacy/3792/5112637127~100x100.awebp`;
const accountRegexp = /.*\/user-avatar\/(.*)~100x100\.awebp$/;
const getDynamicRuleIds = () => {
    return new Promise((resolve) => {
        chrome.declarativeNetRequest.getDynamicRules((rules) => {
            const ruleIds = rules.map((rule) => rule.id);
            resolve(ruleIds);
        });
    });
};
const createRule = (id, account) => {
    const urlFilterStr = `${baseUrl}/user-avatar/${account}~100x100.awebp`;
    const rule = {
        id: id,
        priority: 1,
        action: {
            type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
            redirect: { url: redirectUrl },
        },
        condition: {
            initiatorDomains: ['juejin.cn'],
            requestDomains: ['p3-passport.byteimg.com'],
            domainType: chrome.declarativeNetRequest.DomainType.THIRD_PARTY,
            requestMethods: [chrome.declarativeNetRequest.RequestMethod.GET],
            urlFilter: urlFilterStr,
        },
    };
    return rule;
};
const updateDynamicRules = (addRules, removeRuleIds, account) => {
    chrome.declarativeNetRequest
        .updateDynamicRules({ addRules, removeRuleIds })
        .then(() => {
        if (account)
            cacheAccount(account);
    });
};
const cacheAccount = (account) => {
    chrome.storage.local.get('_accounts').then(({ _accounts }) => {
        if (_accounts && Array.isArray(_accounts)) {
            if (!_accounts.includes(account)) {
                _accounts.push(account);
                chrome.storage.local.set({ _accounts });
            }
        }
        else if (_accounts === undefined) {
            chrome.storage.local.set({ _accounts: [account] });
        }
    });
};
const initRules = () => {
    chrome.storage.local.get('_accounts').then(({ _accounts }) => {
        if (_accounts && Array.isArray(_accounts)) {
            const rules = [];
            for (let i = 0, l = _accounts.length; i < l; i++) {
                rules.push(createRule(2023 + i, _accounts[i]));
            }
            getDynamicRuleIds().then((ruleIds) => updateDynamicRules(rules, ruleIds));
        }
    });
};
chrome.contextMenus.onClicked.addListener(({ menuItemId, srcUrl }) => {
    if (menuItemId === 'juejin_dngt_1' && srcUrl) {
        const account = accountRegexp.exec(srcUrl);
        if (account !== null && account.length > 1) {
            getDynamicRuleIds().then((ruleIds) => {
                let isRuleId = 1 + ruleIds[ruleIds.length - 1] || 1;
                while (ruleIds.includes(isRuleId)) {
                    isRuleId += 1;
                }
                const rule = createRule(isRuleId, account[1]);
                updateDynamicRules([rule], undefined, account[1]);
            });
        }
    }
});
chrome.runtime.onMessage.addListener((message) => {
    chrome.contextMenus.removeAll();
    if (message.type === 'create') {
        initRules();
        chrome.contextMenus.create({
            id: 'juejin_dngt_1',
            title: '呔！修狗哪里跑',
            contexts: ['image'],
            documentUrlPatterns: ['https://juejin.cn/pins'],
            targetUrlPatterns: [`${baseUrl}/user-avatar/*~100x100.awebp`],
        });
    }
    else if (message.type === 'remove') {
        getDynamicRuleIds().then((ruleIds) => updateDynamicRules(undefined, ruleIds));
    }
});
