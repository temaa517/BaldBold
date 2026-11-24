(function () {
    const KEYS = {
        cart: 'bb:cart:v1',
        wishlist: 'bb:wishlist:v1',
        user: 'bb:user:v1',
        orders: 'bb:orders:v1',
        promo: 'bb:promo:v1',
        plan: 'bb:plan:v1',
        avatars: 'bb:avatars:v1',
    };

    const PRODUCTS = [
        { id: 'shine-spf50', name: 'Блеск-флюид для лысины SPF 50 Matt & Glow', price: 62.37, category: 'Уход', tags: ['SPF 50', 'Хит'], rating: 4.9, icon: 'wb_sunny', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_5B6BvjW7GYgdM9U9q8pAnrDyaecGhtxA41tWaNSclN-E_OKOrNr5Fq0oHN7drldAs4cakL2JL2iDsPcI-Cl77taar7zUPcfDTgoYIqrWOkMgIMG0LHk_BIDbecWUlaSyIBKi7NtxbDAzxCeHvw9VdPwNlqYN1XPk7Vrbj5E3ygFHDf0hCk6ArDiO2VFndjYjDv-JSqgvI8czCT_pNDamqzi8cMi14DT4MaIAcvIXvK-JyrPkKguJmw', aliases: ['Блеск для лысины', 'Блеск-флюид', 'SPF50 Shield'] },
        { id: 'foam-purify', name: 'Шампунь-пенка для кожи головы без волос', price: 42.57, category: 'Уход', tags: ['Очищение', 'Хит'], rating: 4.8, icon: 'soap', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZlAutbRKtfG3Ew8XoOKXpIHlydbbekKeBPPGbRO2L4wC8kSyGrPRv2L1Fg8iN5T87b7IRJPr2J_lQaf4oh2wxaEYVgThKPZL1lx9NKtqfbPjRrqFWbFtiEgIHNlGKVQ54vTP7hDd9PZvZ4zsgrNSPnEcDAYFK8jIlw44jWWs-ypfl8GVAO2vMWXxbuTUMW_iSyMK7uJS9e4tXyQXrDytJFn8NOdV7xBuOlNjjgV8Ml1dflN79wjdkIw', aliases: ['Шампунь-пенка', 'Foam Purify'] },
        { id: 'thermal-gel', name: 'Охлаждающая термо-шапочка для релакса', price: 79.20, category: 'Аксессуары', tags: ['Охлаждение', 'Новинка'], rating: 5.0, icon: 'ac_unit', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfVK-xQgm9MngWKNijdLsBH-WaMYNQJgPSAx1VhBRMLieaqM3hHl0tc_rSayfK1Gn9SzyxGFc4ubFBf4L9jnV7PfOa7CfeKBWZPNTe_GQVOf2EeMiBLdSBPz6MLgDeyrwugFyD2GphvUOc3ydswlBG9mA22qZWh45NcujyxJk6g_5Hc9-xLaENU3nThki14ZVrhGiJVT4cYol8JGUawJRg47kpga-FyaxKpR-_vMghuEKUbpoEJERPXQ', aliases: ['термо-шапочка', 'Гидрогель', 'гидрогель после бритья'] },
        { id: 'skullcare-pro', name: 'Силиконовая щётка-массажёр SkullCare Pro', price: 32.67, category: 'Аксессуары', tags: ['Массаж', 'Хит'], rating: 4.9, icon: 'spa', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6adl5SxQfugwuGMIY_rw0ZMAzTgNwWKuJdfafhcdFbfV5ekwYsdpIqwLcTm6wX2JPIzcZSaVdGPhph5iSXNlWFDTfjWWUqNJaU-NpF5B9R4a9tnPbUpztLIVf0PConYfr4JWMjTObsq8CiVJ_ypJ0bI2xOi2BoeQd7Gr7k0Hl0JbV6C-JTxj4rcSC2FeiGJHMTn1q2-XbhON5HACXzRE7DIS14himHSFmP2wSWsZ-VjNFttT94rMwFg', aliases: ['щётка-массажёр', 'щетка-массажер', 'щетка SkullCare'] },
        { id: 'uv-bandana', name: 'Солнцезащитная кепка-бандана UV-Shield', price: 57.75, category: 'Аксессуары', tags: ['SPF 50', 'Новинка'], rating: 4.7, icon: 'dry_cleaning', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrZDtCWp4jOCgmRTb16t4ROLHe98CkR08vJ__DSYJJ4dU7zOnFDTapoyoQQKKeuSOkpVtrePdFvMsL2b4JWbuidi78OEpX1aik70O6mFZ1SP0vBqJ82cVdezf8wDwvhK9Sdz4mBU_0EeuBgJkRIZas-_iVcTy5345iZEvVoJuiicCpHCX8nM168mz0--K4f8le6Mq_7oS_Crn29iUy1VGSNEm3hQbAz64oWv_iUkqKTOilhyyCDxUjig', aliases: ['кепка-бандана', 'UV-Shield'] },
        { id: 'silk-turban', name: 'Шёлковое полотенце-тюрбан для быстрой сушки', price: 39.27, category: 'Аксессуары', tags: ['Шёлк', 'Комфорт'], rating: 4.6, icon: 'inventory_2', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt3RDpoWrM6bVP-yQWcIgIuC2SJFCu5GxJpCTQNUo-ZMvrG57JmEF-4qcjVZpfw4Bbc3AxPCaTh2f5apOHDMuadWa-MOA4e14JFnKC57agw4zGu1M7JcMLxVmstFcbAclVZOGEPFAkzJ1IDhMaCpxxJjd5mtqeSvjhTZGNo4NvspzSjtfgjD7eIpXvjuJWzdm26MRdl1yIQd9lFFRgDETGhCvnw-JwRajXaCb4-JGyqOjNeCIqQXytCA', aliases: ['полотенце-тюрбан'] },
        { id: 'deep-moisture', name: 'Увлажняющий крем для черепа Deep Moisture', price: 69.30, category: 'Уход', tags: ['Увлажнение', 'Хит'], rating: 4.9, icon: 'water_drop', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvB_E7LRpFrl97lKF4TWEcVE5U4Ks0wU-c69hnbPl5rcjgPLW-UyIH9rL5bcE0bVygP22J_cbZyv2gayihx70-M1n-eLxv1Ebm68IgQam-_GQRZhylCOfCdoIEkTyLiYrKPYYza8ZMgF2ZtF-RAVQxu5GdKxHHkK3t_njXWNoVHd0vxl3IWX28z_YR5p9j1VOalmu-T_4_Zljf6v0_YwFzWepIz1Wlq7mkJAG5Wgu68FzwO_fzb7itnA', aliases: ['Deep Moisture', 'Гидрогеля'] },
        { id: 'anti-glare', name: 'Антибликовые матирующие салфетки (60 шт.)', price: 21.45, category: 'Уход', tags: ['Антиблик', 'Хит'], rating: 4.8, icon: 'layers', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEopfkvVDUtHpb5NzTIqQZloxequGtAT2WtNEsOADMh3R5Mx-xusma8RVFEINTxCbTYhLaGGk76LcTgP4cuYFBW8cdQT1Z4II9gOH_L8o7kMxs7im2_xmDXEO2Gf2_kiCKY7KLgFjE95DZAfG_YQQ9IHUcAOqAKU3D9vrV1bCENgCHYDIuj4Dbyr8JaBIjy5kdssJJMOTzhMdOYgQCXQMYNMNA_rr4BrCwL1GyAalgtw0Qki8F_MYgFg', aliases: ['салфетки', 'салфетка', 'Антибликовые'] },
        { id: 'gift-deluxe', name: 'Подарочный бокс Королевский Блеск Deluxe', price: 164.67, category: 'Подарки', tags: ['Подарок', 'VIP'], rating: 5.0, icon: 'redeem', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoQyHjsWViLk-lwF05sd3zDrfyl001gTwuCOhK1kZjXbFXfW_Ayp-FBm89ZRJ2JMeS-cTwvgdCrELacXhKMzK2RpEgAeAxmb-a8DCkNXCQySUSGoqSdpyV4FFPHpirnZkUJvzG00K83duwkCPkLDZ8B29bltXUmaVhfqGYwgw-RQSwNl3hmqdyaIwhZQwe9aDWF59C_Afw667MM7VzoWK75AOTrmrIrfy35rQ16GssEevmFaqb8DthtQ', aliases: ['Подарочный бокс', 'Deluxe', 'VIP Gift Set'] },
        { id: 'scrub-polish', name: 'Скраб-гоммаж для полировки', price: 47.85, category: 'Уход', tags: ['Пилинг'], rating: 4.8, icon: 'spa', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmekVMjBtJFE_GKDizshu-mvA-EEJ1mSoVrRfzpqJBdy7jAlRW7ZihJkjntqFTHIbiEe7mHYvghYA3BBhYRCR6kqJoQYkOX2e48kz_K6MH7NTIEbk8xMmqMGlGlI3IYqZto-mxfJL_RCAizHR7oQssX-oDLgiGmY_y5ilBdQs8I6Mk0VO4ZsaYtStEt4o1C8pVYxq31rl3BBtKQ4H9khXkNb6lb4lgTboQ-T-FUEasrXFT2OfnIZfGIA', aliases: ['Скраб-гоммаж'] },
        { id: 'baldblade-pro', name: 'Станок BaldBlade Pro 5', price: 95.70, category: 'Аксессуары', tags: ['Бритьё', 'Новинка'], rating: 4.9, icon: 'content_cut', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALRDbyP6bouVMyWZ7bkB73Wao-kT50zB5cdOvKi_d5t8n3PfUJ-RcnOJrZWWjtVMy7QVj8nBiyMNVEHyx_9e5ugBVCAqHYI09iiSRD1PfOqUqOEzzqHZz1uLBFtwPMhogoBfAh1YzkJtZsUHn0nVi6CLIZqyeD5mhJ3QWNqRdhZJgnf5RN9t45UdGFQpX6Ej6nUsW8-u5KSyfncPat7U_Gg7O5zgU8DxSCv5yprW5WuHg7Rr8xKHjHYQ', aliases: ['BaldBlade'] },
        { id: 'rest-glow', name: 'Ночная сыворотка Rest & Glow', price: 70.95, category: 'Уход', tags: ['Ночной уход', 'Новинка'], rating: 4.9, icon: 'dark_mode', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAckJhlO1RnrMG0ohisFZ-CWbPsmcyRuAlrbF-34-kWL-zKRhDDu9GnjpUvF0af_tiRV7CJ8kAaqhruUE2HGfKXMNk1JBPnYa4DpbK2dK70Yu_OvfgTLc7HtZdLs2dwFjuXoBopwZMCWxekUzayApThx6Miiy4ZocrVVAw9yEsRxHJTbt3NIhzLFSb4mnEwWD_7lm3-mPC_fZw7SGNQo3Ln6oskcHttfUxL2CrugRNEsr90RNo8HTwxtw', aliases: ['Rest & Glow'] },
        { id: 'matte-towel', name: 'Микрофибровое полотенце Matte', price: 29.37, category: 'Аксессуары', tags: ['Микрофибра'], rating: 4.7, icon: 'inventory_2', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2TKiOXXnhf5F_0DoivXgEBhn5iw7dmklL0mURpaWx_jK4YFAcor8e9LRo801ZDGPzl0bb_ZJoqN02FCBQb9hbD7ybHQrKm_bP9ugbXXgOP-BPJo3u4y1zdg-Hnsnv4NzqSuZ25lpS5Z7zbdE_0NztE_smzbw_ln0hfjb_tdNRvEJLyvPW_LDiZewDA72aMx00vi-_d0D9jyvo3XH-BG6ybQlPz70I8DpR18hwnT8Oxmx_VfgZgF1PFA', aliases: ['Микрофибровое полотенце', 'салфетка из микрофибры'] },
    ];

    const PRODUCT_INFO = {
        'shine-spf50': { category: 'Солнцезащита', description: 'Мгновенное впитывание, без ощущения липкости. Сбалансированный благородный тон.', specs: ['SPF 50+', 'Матовый финиш', 'Без липкости'], reviews: 128, stock: true },
        'foam-purify': { category: 'Уход за кожей', description: 'Мягкая деликатная формула с цинком и экстрактом чайного дерева для тотальной свежести.', specs: ['Цинк', 'Чайное дерево', 'Для чувствительной кожи'], reviews: 64, stock: true },
        'thermal-gel': { category: 'Головные уборы', description: 'Анатомический гидрогель для снятия стресса и охлаждения черепа после тренировок.', specs: ['Охлаждение', 'Для спорта', 'Анатомическая посадка'], reviews: 42, stock: true },
        'skullcare-pro': { category: 'Бритьё и массаж', description: 'Улучшает микроциркуляцию, очищает поры и дарит непревзойденный тонус при мытье.', specs: ['Силикон', 'Массаж', 'Для чувствительной кожи'], reviews: 89, stock: true },
        'uv-bandana': { category: 'Солнцезащита', description: 'Дышащая ультратонкая мембрана с блокировкой 99% ультрафиолета. Идеальная посадка.', specs: ['SPF 50+', '99% UV', 'Для спорта'], reviews: 31, stock: false },
        'silk-turban': { category: 'Аксессуары', description: 'Натуральный шёлк тутового шелкопряда. Не травмирует эпидермис и полирует поверхность.', specs: ['100% шёлк', 'Быстрая сушка', 'Для сухой кожи'], reviews: 19, stock: false },
        'deep-moisture': { category: 'Уход за кожей', description: 'Мгновенное впитывание, без ощущения липкости. Ниацинамид и гиалуроновый комплекс.', specs: ['Ниацинамид', 'Гиалуроновый комплекс', '24 часа'], reviews: 110, stock: true },
        'anti-glare': { category: 'Уход за кожей', description: 'Бамбуковый уголь мгновенно устраняет жирный блеск перед важными фотосессиями и встречами.', specs: ['60 шт.', 'Бамбуковый уголь', 'Матовый финиш'], reviews: 76, stock: true },
        'gift-deluxe': { category: 'Подарки', description: 'Полный комплекс: сыворотка, матирующий крем, щетка и бархатная полировочная салфетка.', specs: ['Сыворотка', 'Матирующий крем', 'Щётка', 'Салфетка'], reviews: 54, stock: true },
        'scrub-polish': { category: 'Уход за кожей', description: 'Мягкий гоммаж бережно полирует кожу головы, убирая огрубевшие клетки без раздражения.', specs: ['Пилинг', 'Полировка', 'Без агрессивных частиц'], reviews: 38, stock: true },
        'baldblade-pro': { category: 'Бритьё и массаж', description: 'Пятилезий станок для гладкого бритья с минимальным давлением на кожу и точной геометрией головки.', specs: ['5 лезвий', 'Для бритья', 'Сменные кассеты'], reviews: 72, stock: true },
        'rest-glow': { category: 'Уход за кожей', description: 'Ночная сыворотка восстанавливает кожу во сне и сохраняет здоровое сияние к утру.', specs: ['Ночной уход', 'Восстановление', 'Без липкости'], reviews: 45, stock: true },
        'matte-towel': { category: 'Аксессуары', description: 'Микрофибровое полотенце бережно высушивает кожу и сохраняет матовый финиш без ворсинок.', specs: ['Микрофибра', 'Матовый финиш', 'Для ежедневного ухода'], reviews: 27, stock: true },
    };

    const AVATARS = [
        { match: ['александр', 'alexander', 'alexandr', 'self', 'демо-гость'], src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsOs3EnASY-Py612dmp-X7OfHraGEyrSf_X-tE1sfpSy2JC480dZOBpIqd8_T8iHafYHclniFZX0FtPFL1g2VYpsgXOM7FzvfZqaLPkXIuxp4S0UT8haqOzsKKKR-TpqKLM_D6sbkHaxVUnOOPHJPtgJxjIRDDf4pq2DiY7rRVFTD40b0D6Js2R9L-lfK1yCpaQOE-bI7qklIe1ttNFiw96neLwf-zeot9k5TvCszHcpCaxyJy25-l7w' },
        { match: ['алексей', 'alexey', 'алексей г.'], src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0IQ8_-yFvCr4YACjWsTWXcr_ekoH7zxiBdHQJne5QRan5NkmseURkIxr2KL_PWlUTVfqGeM_ZM1NC-UhbZRY8XCX71wVhpxO77W43KKH4M6Q3-WNrctudGL10yMTnmkPrJkM1htJ4M5LXIxbZ1ABLG914BzPZR0oreWjxd8SahsAYKOJiwku5AOqhn57w5qlXCGiCLc5Sc0mwJSmkeRhmogS-ugsGDL1qdb73dWg8bZVs_fhiKNsM4g' },
        { match: ['дмитрий', 'dmitry', 'дмитрий м.'], src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5FuByVnPEa3wB-vvgGvaupimCfUW5Ojc0fJeU44ZkVUjrYQST9VVWCgX32BcaYHZeITIFAEi2OYkBnLJTwaUJ06inzTtBQ9KTPI-5VwB5XBYB4vHOLZn2g7TOUcrjIV04Fu9XM-6d5LMUr39B-yXgrlQJ0QsqKRZQFhDzgyrJEIA7cv5R8It0JS-bewmMl3iqfwENNW_lOawFIQfTH15I0J7kAq3lYxoMtO7E6GXS1aaXbDWzLPsolw' },
        { match: ['игорь', 'igor'], src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA-7z2PFpkzEJJFaWCUU1k9rtqPKjHjUfuL4SREapPW3uvukNGQ2q-ij3tCSKADyFJkOQIWRRwvtWRNdjJao7_sbQzKe8OdJHy150-3EkQqGtbfel19zoAvRPH9Thw-1YLTVJjVkly6gj0cTKPTaKWrXfbJa5BLSCZGFGMHjO6pmCOz-1FqU7_xsdEVVBjRWDHft_0xWgxa7K_QvC1bOlrI95rmpojd181emQNv5kGIcS_Hru9n7zjfQ' },
        { match: ['мария', 'maria'], src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrZDtCWp4jOCgmRTb16t4ROLHe98CkR08vJ__DSYJJ4dU7zOnFDTapoyoQQKKeuSOkpVtrePdFvMsL2b4JWbuidi78OEpX1aik70O6mFZ1SP0vBqJ82cVdezf8wDwvhK9Sdz4mBU_0EeuBgJkRIZas-_iVcTy5345iZEvVoJuiicCpHCX8nM168mz0--K4f8le6Mq_7oS_Crn29iUy1VGSNEm3hQbAz64oWv_iUkqKTOilhyyCDxUjig' },
        { match: ['служба', 'care', 'поддержк'], src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB35-4QPm4ifJ5IQbY0PkA07EXEmu6mhWz6IREkD4ZRdQ5ivnu2v9uoA2JmeobRIuCuqgsIwdwqeQ53_Bh8xFsZcNseYwZuwz4Luj4i6w_SJhe2Vp9oYVdv1PKIX3-_oTNBdTIRMze5QJjIlNm03Xthe-ZTC-Tzp9BuczgXBGCLLTPLap7G9c2Rp34LjChRZk_i6nNBJpOVn2R5dsn8NYVkMRbQXVg7gmySU2jlS9_KNPJvpL85qE73qw' },
    ];


    const INFO = {
        contacts: {
            title: 'Контакты Bald & Bold',
            body: '<p>Мы на связи каждый день с 09:00 до 21:00 (МСК).</p><p><strong>Email:</strong> hello@baldandbold.ru<br><strong>Телефон:</strong> +7 499 120-45-90<br><strong>Адрес:</strong> Москва, ул. Тверская, 12</p><p>Напишите нам — ответим в течение часа и подберём уход под вашу кожу.</p>',
        },
        support: {
            title: 'Задать вопрос',
            body: '<p>Не знаете, какой SPF или финиш выбрать? Напишите нам, и эксперт клуба соберёт персональный ритуал ухода.</p><p><strong>Email:</strong> expert@baldandbold.ru<br><strong>Телефон:</strong> +7 499 120-45-90</p>',
        },
        privacy: {
            title: 'Политика конфиденциальности',
            body: '<p>Мы используем email только для чеков, статуса заказов и важных обновлений клуба. Данные не передаются третьим лицам.</p><p>Отписаться от рассылки можно в любой момент ссылкой в письме или в настройках профиля.</p>',
        },
        return: {
            title: 'Возврат и обмен',
            body: '<p>Вернуть товар надлежащего качества можно в течение 14 дней с момента получения. Для невскрытой упаковки мы оформим возврат стоимости.</p><p>Если средство не подошло, напишите на hello@baldandbold.ru — подберём альтернативу или оформим компенсацию.</p>',
        },
        delivery: {
            title: 'Доставка',
            body: '<p>Курьером по Москве — от 1 дня, по России — 2–5 дней. Экспресс-доставка доступна при оформлении заказа.</p><p>Бесплатная доставка от 99 Br. Бонусы клуба можно применить к следующему заказу.</p>',
        },
        about: {
            title: 'О Bald & Bold',
            body: '<p>Bald & Bold — клуб ухода за кожей без волос. Мы создаём средства, которые подчёркивают форму, защищают от солнца и дают благородный финиш без жирного блеска.</p>',
        },
        gifts: {
            title: 'Подарочные карты',
            body: '<p>Подарочная карта Bald & Bold — это выбор средства любимому блеску. Номиналы от 25 до 200 Br, срок действия 12 месяцев.</p><p>Напишите на hello@baldandbold.ru, чтобы оформить карту с персональным посланием.</p>',
        },
        social: {
            title: 'Мы в соцсетях',
            body: '<p>Подписывайтесь на Bald & Bold: разбираем уход, публикуем новые дропы и дарим бонусы подписчикам.</p><p>Telegram, VK и чат клуба доступны по ссылкам внизу страницы. В демо-версии внешние переходы заменены этим окном.</p>',
        },
    };

    const DEFAULT_CART = [
        { id: 'shine-spf50', qty: 1 },
        { id: 'skullcare-pro', qty: 1 },
        { id: 'anti-glare', qty: 2 },
    ];

    let scrollLocks = 0;

    function read(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw === null ? fallback : JSON.parse(raw);
        } catch (error) {
            return fallback;
        }
    }

    function write(key, value, eventName) {
        localStorage.setItem(key, JSON.stringify(value));
        window.dispatchEvent(new CustomEvent(eventName, { detail: value }));
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        })[char]);
    }

    function svgAvatar(name) {
        const value = String(name || '').trim();
        const words = value.split(/\s+/).filter(Boolean);
        const initials = (words.length ? words.slice(0, 2).map((word) => word.charAt(0)).join('') : 'BB').toUpperCase();
        let hash = 0;
        for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) % 997;
        const palette = ['#f2a93b', '#7c6cd8', '#2aa198', '#d76d77', '#4f86c6', '#a66b3f', '#8d6e63', '#5c8d5a'];
        const background = palette[hash % palette.length];
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="64" fill="' + background + '"/><text x="64" y="64" fill="#ffffff" font-family="Montserrat,Arial,sans-serif" font-size="46" font-weight="700" text-anchor="middle" dominant-baseline="central">' + escapeHtml(initials) + '</text></svg>';
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    function avatarFor(name) {
        const value = String(name || '').trim();
        const key = value.toLowerCase();
        const custom = read(KEYS.avatars, {}) || {};
        if (custom[key]) return custom[key];
        const user = store.user();
        if (user && user.avatar && (key === 'self' || key === 'я' || (user.name && key === String(user.name).trim().toLowerCase()))) return user.avatar;
        const found = AVATARS.find((entry) => entry.match.some((token) => key.includes(token)));
        return found ? found.src : svgAvatar(value || 'BB');
    }

    function renderAvatars() {
        document.querySelectorAll('img[data-bb-avatar]').forEach((image) => {
            const name = image.dataset.bbAvatar;
            const src = avatarFor(name);
            if (image.getAttribute('src') !== src) image.setAttribute('src', src);
            image.setAttribute('alt', 'Аватар: ' + (name || 'пользователя'));
            image.classList.add('object-cover', 'rounded-full');
        });
    }

    function canonical(name) {
        const text = String(name || '').toLowerCase();
        return PRODUCTS.find((product) => product.aliases.some((alias) => text.includes(alias.toLowerCase()))) || null;
    }

    function parsePrice(text) {
        if (!text) return 0;
        const normalized = String(text).replace(/[\u00a0\s]/g, '').replace(',', '.');
        const match = normalized.match(/(\d+(?:\.\d+)?)(Br|₽|руб)?/i);
        if (!match) return 0;
        const value = parseFloat(match[1]);
        return /₽|руб/i.test(match[2] || '') ? Math.round(value * 0.033 * 100) / 100 : value;
    }

    function money(value) {
        return value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' Br';
    }

    function cardFor(element) {
        return element.closest('[data-bb-product-id]') || element.closest('[data-bb-product]') || element.closest('article') || element.closest('.bb-product-card') || element.closest('.bb-related-card') || element.parentElement;
    }

    function productFrom(element) {
        const card = cardFor(element);
        if (!card) return null;
        const explicitId = card.dataset.bbProductId || card.getAttribute('data-bb-product-id');
        const name = card.querySelector('h1, h2, h3')?.textContent.trim() || card.dataset.name || '';
        const found = (explicitId && PRODUCTS.find((product) => product.id === explicitId))
            || canonical(name)
            || canonical(card.dataset.productId || card.dataset.name || '');
        if (!found) return null;
        const image = card.querySelector('img')?.getAttribute('src') || found.image || '';
        const priceText = card.innerText.match(/([\d\s.,]+)\s*(?:Br|₽|руб)/i)?.[0];
        return Object.assign({}, found, {
            image,
            price: priceText ? parsePrice(priceText) : found.price,
        });
    }

    function cartItems() {
        return read(KEYS.cart, DEFAULT_CART.map((item) => Object.assign({}, item)));
    }

    function persistCart(items) {
        write(KEYS.cart, items, 'bb:cart');
        renderBadges();
    }

    function lockScroll() {
        scrollLocks += 1;
        document.body.style.overflow = 'hidden';
    }

    function unlockScroll() {
        scrollLocks = Math.max(0, scrollLocks - 1);
        if (scrollLocks === 0) document.body.style.overflow = '';
    }

    function showOverlay(overlay, trigger) {
        if (!overlay) return;
        overlay.hidden = false;
        lockScroll();
        overlay.dataset.bbTrigger = trigger ? 'true' : '';
        const focusable = overlay.querySelector('input, button, a');
        if (focusable) setTimeout(() => focusable.focus(), 0);
    }

    function hideOverlay(overlay) {
        if (!overlay || overlay.hidden) return;
        overlay.hidden = true;
        unlockScroll();
    }

    const store = {
        products: PRODUCTS,
        money,
        cart() {
            return cartItems().map((item) => {
                const product = PRODUCTS.find((entry) => entry.id === item.id) || PRODUCTS[0];
                return Object.assign({}, product, item, {
                    lineId: item.lineId || item.id,
                    qty: Number(item.qty || 1),
                    price: typeof item.price === 'number' ? item.price : product.price,
                    image: item.image || product.image || '',
                });
            });
        },
        cartCount() {
            return cartItems().reduce((sum, item) => sum + Number(item.qty || 0), 0);
        },
        subtotal() {
            return Math.round(this.cart().reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0) * 100) / 100;
        },
        add(product, qty) {
            if (!product || !product.id) return;
            const items = cartItems();
            const variant = product.variant || '';
            const lineId = product.id + (variant ? '|' + variant : '');
            const existing = items.find((item) => item.id === product.id && (item.variant || '') === variant);
            if (existing) {
                existing.qty = Number(existing.qty || 0) + Number(qty || 1);
            } else {
                items.push({
                    id: product.id,
                    lineId,
                    qty: Number(qty || 1),
                    image: product.image || '',
                    price: Number(product.price || 0),
                    variant,
                    volume: product.volume || '',
                    finish: product.finish || '',
                    unitPrice: Number(product.unitPrice || product.price || 0),
                });
            }
            persistCart(items);
            store.toast(`${product.name} — в корзине`, 'success');
        },
        remove(id) {
            persistCart(cartItems().filter((item) => (item.lineId || item.id) !== id && item.id !== id));
            store.toast('Товар удалён из корзины');
        },
        setQty(id, qty) {
            const items = cartItems();
            const item = items.find((entry) => (entry.lineId || entry.id) === id || entry.id === id);
            if (!item) return;
            item.qty = Math.max(1, Math.min(99, qty));
            persistCart(items);
        },
        clear() {
            persistCart([]);
        },
        wishlist() {
            return read(KEYS.wishlist, []);
        },
        toggleWishlist(product) {
            if (!product || !product.id) return;
            const items = store.wishlist();
            const index = items.indexOf(product.id);
            if (index === -1) {
                items.push(product.id);
                store.toast('Добавлено в избранное', 'success');
            } else {
                items.splice(index, 1);
                store.toast('Удалено из избранного');
            }
            write(KEYS.wishlist, items, 'bb:wishlist');
            renderWishlist();
            renderWishlistPanel();
        },
        isWish(id) {
            return store.wishlist().indexOf(id) !== -1;
        },
        user() {
            return read(KEYS.user, null);
        },
        setUser(user) {
            const next = Object.assign({}, user || {});
            if (!next.id) next.id = 'bb-user-' + String(next.email || next.name || 'guest').toLowerCase().replace(/[^a-z0-9а-яё]+/gi, '-');
            if (!next.avatar) next.avatar = avatarFor(next.name || 'self');
            write(KEYS.user, next, 'bb:user');
            renderUser();
            renderAvatars();
        },
        avatarFor(name) {
            return avatarFor(name);
        },
        renderAvatars() {
            renderAvatars();
        },
        setAvatar(target, value) {
            const key = String(target || 'self').trim().toLowerCase();
            const map = read(KEYS.avatars, {}) || {};
            if (value) map[key] = value;
            else delete map[key];
            write(KEYS.avatars, map, 'bb:avatar');
            renderAvatars();
        },
        orders() {
            return read(KEYS.orders, []);
        },
        addOrder(order) {
            const orders = store.orders();
            orders.unshift(order);
            write(KEYS.orders, orders, 'bb:order');
        },
        promo() {
            return read(KEYS.promo, null);
        },
        setPromo(value) {
            write(KEYS.promo, value, 'bb:promo');
        },
        plan() {
            return read(KEYS.plan, null);
        },
        setPlan(value) {
            write(KEYS.plan, value, 'bb:plan');
        },
        openInfo(type) {
            openInfo(type);
        },
        openProduct(id) {
            openProduct(id);
        },
        openSearch(value) {
            openSearch(value);
        },
        toast(message, type) {
            const root = document.getElementById('bb-toast-root');
            if (!root) return;
            const toast = document.createElement('div');
            const tone = type === 'success'
                ? 'bg-primary-container text-on-primary'
                : type === 'error'
                    ? 'bg-semantic-danger text-white'
                    : 'bg-surface-container-lowest text-on-surface dark:bg-primary-container dark:text-on-primary';
            toast.className = `pointer-events-auto flex items-center gap-3 rounded-xl border border-outline-variant/40 px-4 py-3 text-body-sm shadow-lifted backdrop-blur ${tone}`;
            toast.setAttribute('role', 'status');
            const icon = document.createElement('span');
            icon.className = 'material-symbols-outlined text-[18px]';
            icon.textContent = type === 'error' ? 'error' : type === 'success' ? 'check_circle' : 'info';
            const label = document.createElement('span');
            label.textContent = message;
            toast.append(icon, label);
            root.appendChild(toast);
            setTimeout(() => toast.remove(), 3500);
        },
    };

    window.BBStore = store;

    function renderBadges() {
        const count = store.cartCount();
        document.querySelectorAll('[data-bb-cart-count]').forEach((element) => {
            element.textContent = count;
            element.classList.toggle('hidden', count === 0 && element.dataset.bbHideEmpty === 'true');
        });
    }

    function renderWishlist() {
        const items = store.wishlist();
        document.querySelectorAll('[data-bb-wish-id]').forEach((button) => {
            const active = items.indexOf(button.dataset.bbWishId) !== -1;
            button.setAttribute('aria-pressed', String(active));
            const icon = button.querySelector('.material-symbols-outlined');
            if (icon) icon.style.fontVariationSettings = active ? "'FILL' 1" : "'FILL' 0";
            button.classList.toggle('text-error', active);
        });
        const count = document.querySelector('[data-bb-wishlist-count]');
        if (count) {
            count.textContent = items.length;
            count.classList.toggle('hidden', items.length === 0);
        }
    }

    function renderUser() {
        const user = store.user();
        document.querySelectorAll('[data-bb-user-name]').forEach((element) => {
            element.textContent = user && user.name ? user.name : element.dataset.bbUserName;
        });
        renderAvatars();
    }

    function renderWishlistPanel() {
        const list = document.getElementById('bb-wishlist-items');
        if (!list) return;
        const items = store.wishlist()
            .map((id) => PRODUCTS.find((product) => product.id === id))
            .filter(Boolean);
        if (!items.length) {
            list.innerHTML = '<div class="rounded-xl border border-dashed border-outline-variant/60 p-6 text-center text-body-sm text-on-surface-variant dark:text-outline-variant">Пока пусто. Добавьте товары сердцем в каталоге.</div>';
            return;
        }
        list.innerHTML = items.map((product) => `
            <div class="flex items-center gap-3 rounded-xl border border-outline-variant/40 p-3 dark:border-outline/30" data-wish-row="${escapeHtml(product.id)}">
                <div class="w-12 h-12 shrink-0 rounded-lg bg-surface-container-low dark:bg-primary-container overflow-hidden flex items-center justify-center">
                    ${product.image ? `<img class="w-full h-full object-contain" alt="${escapeHtml(product.name)}" src="${escapeHtml(product.image)}"/>` : `<span class="material-symbols-outlined text-primary dark:text-brand-300">${escapeHtml(product.icon)}</span>`}
                </div>
                <div class="min-w-0 flex-1">
                    <a class="block truncate text-body-sm font-semibold text-primary hover:underline dark:text-on-primary" href="../bald_bold_3/code.html?id=${encodeURIComponent(product.id)}">${escapeHtml(product.name)}</a>
                    <span class="text-label-sm text-on-surface-variant dark:text-outline-variant">${money(product.price)}</span>
                </div>
                <button type="button" class="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low dark:text-outline-variant dark:hover:bg-primary-container" data-wish-remove="${escapeHtml(product.id)}" aria-label="Убрать из избранного">
                    <span class="material-symbols-outlined text-[18px]">close</span>
                </button>
            </div>
        `).join('');
    }

    function headerActions() {
        const header = document.querySelector('header');
        if (!header) return null;
        const selectors = [
            '.flex.items-center.gap-1',
            '.flex.items-center.gap-3',
            '.flex.items-center.gap-4',
            '.flex.items-center.gap-5',
        ];
        for (const selector of selectors) {
            const candidate = header.querySelector(selector);
            if (candidate && !candidate.closest('a')) return candidate;
        }
        return Array.from(header.children).find((child) => child.tagName !== 'A') || header;
    }

    function prepareCards() {
        document.querySelectorAll('[data-bb-product-id], .bb-product-card, .bb-related-card, article').forEach((card) => {
            if (card.dataset.bbProductId) return;
            const name = card.querySelector('h1, h2, h3')?.textContent.trim() || '';
            const found = canonical(name);
            if (found) card.dataset.bbProductId = found.id;
        });
        document.querySelectorAll('.bb-product-card, .bb-related-card, [data-bb-product-id]').forEach((card) => {
            const id = card.dataset.bbProductId;
            if (!id || location.pathname.includes('bald_bold_3')) return;
            const title = card.querySelector('h2, h3');
            if (title && !title.dataset.bbDetail) {
                title.dataset.bbDetail = id;
                title.classList.add('cursor-pointer');
            }
            const image = card.querySelector('img');
            if (image && !image.dataset.bbDetail) {
                image.dataset.bbDetail = id;
                image.setAttribute('role', 'button');
                image.setAttribute('tabindex', '0');
                image.setAttribute('title', 'Подробнее о товаре');
                image.classList.add('cursor-pointer');
            }
        });
        document.querySelectorAll('[title="В избранное"], [aria-label="Добавить в избранное"], [data-bb-wish]').forEach((button) => {
            if (button.dataset.bbWishId) return;
            const product = productFrom(button);
            if (product) button.dataset.bbWishId = product.id;
        });
        document.querySelectorAll('a[href$="bald_bold_4/code.html"]').forEach((link) => {
            const badge = link.querySelector('span.absolute');
            if (badge && !badge.hasAttribute('data-bb-cart-count')) {
                badge.setAttribute('data-bb-cart-count', '');
                badge.dataset.bbHideEmpty = 'true';
            }
        });
    }

    function addGlobalStyles() {
        if (document.getElementById('bb-global-styles')) return;
        const style = document.createElement('style');
        style.id = 'bb-global-styles';
        style.textContent = `
            html { scroll-padding-top: 9rem; }
            button, a { -webkit-tap-highlight-color: transparent; }
            .bb-icon-btn { min-width: 2.5rem; min-height: 2.5rem; }
            [data-bb-wish-id][aria-pressed="true"] .material-symbols-outlined { font-variation-settings: 'FILL' 1; }

            .bb-add-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 0.375rem;
                height: 2.75rem;
                min-height: 2.75rem;
                line-height: 1;
                white-space: nowrap;
                flex-shrink: 0;
            }
            .bb-add-btn .material-symbols-outlined {
                display: grid;
                place-items: center;
                width: 1.25rem;
                height: 1.25rem;
                font-size: 18px;
                line-height: 1;
            }
            .bb-add-btn > span:last-child { line-height: 1; white-space: nowrap; }

            .dark { color-scheme: dark; }
            .dark html, .dark body { background-color: #121216; color: #f0f0f2; }

            .dark [class~="bg-background"]:not([class*="dark:bg-"]),
            .dark [class*="bg-background/"]:not([class*="dark:bg-"]),
            .dark [class~="bg-surface"]:not([class*="dark:bg-"]),
            .dark [class*="bg-surface/"]:not([class*="dark:bg-"]) { background-color: #121216; }
            .dark [class~="bg-surface-container"]:not([class*="dark:bg-"]),
            .dark [class*="bg-surface-container/"]:not([class*="dark:bg-"]) { background-color: #1b1b21; }
            .dark [class~="bg-surface-container-low"]:not([class*="dark:bg-"]),
            .dark [class*="bg-surface-container-low/"]:not([class*="dark:bg-"]) { background-color: #17171c; }
            .dark [class~="bg-surface-container-lowest"]:not([class*="dark:bg-"]),
            .dark [class*="bg-surface-container-lowest/"]:not([class*="dark:bg-"]) { background-color: #1e1e24; }
            .dark [class~="bg-surface-container-high"]:not([class*="dark:bg-"]),
            .dark [class*="bg-surface-container-high/"]:not([class*="dark:bg-"]) { background-color: #26262d; }
            .dark [class~="bg-surface-container-highest"]:not([class*="dark:bg-"]),
            .dark [class*="bg-surface-container-highest/"]:not([class*="dark:bg-"]) { background-color: #303038; }
            .dark [class~="bg-surface-variant"]:not([class*="dark:bg-"]) { background-color: #2f2f37; }
            .dark [class~="bg-white"]:not([class*="dark:bg-"]) { background-color: #1e1e24; }
            .dark [class~="bg-[#F4F4F6]"]:not([class*="dark:bg-"]) { background-color: #24242b; }
            .dark [class~="bg-secondary-container"]:not([class*="dark:bg-"]),
            .dark [class*="bg-secondary-container/"]:not([class*="dark:bg-"]) { background-color: #4a3f2e; }
            .dark [class~="bg-brand-100"]:not([class*="dark:bg-"]) { background-color: #5a431f; }
            .dark [class~="bg-brand-200"]:not([class*="dark:bg-"]) { background-color: #6b4f22; }

            .dark [class~="text-primary"]:not([class*="dark:text-"]):not([class*="bg-brand-"]):not([class*="bg-tertiary-fixed"]):not([class*="bg-secondary-fixed"]),
            .dark [class*="text-primary/"]:not([class*="dark:text-"]):not([class*="bg-brand-"]):not([class*="bg-tertiary-fixed"]):not([class*="bg-secondary-fixed"]) { color: #f0f0f2; }
            .dark [class~="text-on-background"]:not([class*="dark:text-"]),
            .dark [class~="text-on-surface"]:not([class*="dark:text-"]),
            .dark [class*="text-on-surface/"]:not([class*="dark:text-"]) { color: #f0f0f2; }
            .dark [class~="text-on-surface-variant"]:not([class*="dark:text-"]),
            .dark [class*="text-on-surface-variant/"]:not([class*="dark:text-"]) { color: #c8c5cb; }
            .dark [class~="text-outline"]:not([class*="dark:text-"]),
            .dark [class*="text-outline/"]:not([class*="dark:text-"]) { color: #9c9aa1; }
            .dark [class~="text-outline-variant"]:not([class*="dark:text-"]),
            .dark [class*="text-outline-variant/"]:not([class*="dark:text-"]) { color: #b9b6bd; }
            .dark [class~="text-on-secondary-container"]:not([class*="dark:text-"]) { color: #f0ddbf; }
            .dark [class~="text-brand-800"]:not([class*="dark:text-"]) { color: #ffd79e; }
            .dark [class~="text-brand-900"]:not([class*="dark:text-"]) { color: #ffd79e; }
            .dark [class~="text-semantic-danger"]:not([class*="dark:text-"]) { color: #ff8a8a; }

            .dark [class~="border-outline-variant"]:not([class*="dark:border-"]),
            .dark [class*="border-outline-variant/"]:not([class*="dark:border-"]),
            .dark [class~="border-surface-container-highest"]:not([class*="dark:border-"]) { border-color: #4a4950; }
        `;
        document.head.appendChild(style);
    }

    function addToasts() {
        if (document.getElementById('bb-toast-root')) return;
        const root = document.createElement('div');
        root.id = 'bb-toast-root';
        root.setAttribute('aria-live', 'polite');
        root.className = 'pointer-events-none fixed bottom-4 right-4 z-[70] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2';
        document.body.appendChild(root);
    }

    function addMobileMenu() {
        const header = document.querySelector('header');
        if (!header || document.querySelector('[data-sidebar-open]')) return;
        let button = document.querySelector('[data-bb-menu-btn]');
        if (!button) {
            const existing = document.querySelector('button[aria-label="Открыть меню"]');
            if (existing) {
                button = existing;
                button.setAttribute('data-bb-menu-btn', '');
            } else {
                button = document.createElement('button');
                button.type = 'button';
                button.setAttribute('data-bb-menu-btn', '');
                button.setAttribute('aria-label', 'Открыть меню');
                button.setAttribute('aria-expanded', 'false');
                button.className = 'md:hidden bb-icon-btn w-10 h-10 rounded-xl flex items-center justify-center text-primary dark:text-on-primary hover:bg-surface-container-low transition-colors';
                button.innerHTML = '<span class="material-symbols-outlined">menu</span>';
                const actions = headerActions();
                if (actions) actions.prepend(button);
                else header.appendChild(button);
            }
        }
        button.type = 'button';
        button.setAttribute('aria-controls', 'bb-mobile-menu');
        button.setAttribute('aria-expanded', 'false');

        let panel = document.getElementById('bb-mobile-menu');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'bb-mobile-menu';
            panel.hidden = true;
            panel.className = 'md:hidden fixed inset-x-0 top-16 sm:top-20 z-40 border-b border-outline-variant/40 bg-surface-container-lowest/95 p-4 shadow-lifted backdrop-blur dark:bg-primary-container/95';
            panel.innerHTML = '<nav class="grid grid-cols-1 gap-1">' +
                '<a class="rounded-xl px-4 py-3 text-body-md text-primary hover:bg-surface-container-low dark:text-on-primary dark:hover:bg-inverse-surface" href="../bald_bold_1/code.html">Главная</a>' +
                '<a class="rounded-xl px-4 py-3 text-body-md text-primary hover:bg-surface-container-low dark:text-on-primary dark:hover:bg-inverse-surface" href="../bald_bold_2/code.html">Каталог</a>' +
                '<a class="rounded-xl px-4 py-3 text-body-md text-primary hover:bg-surface-container-low dark:text-on-primary dark:hover:bg-inverse-surface" href="../bald_bold_5/code.html">Личный кабинет</a>' +
                '<a class="rounded-xl px-4 py-3 text-body-md text-primary hover:bg-surface-container-low dark:text-on-primary dark:hover:bg-inverse-surface" href="../bald_bold_4/code.html">Корзина</a>' +
                '<a class="rounded-xl px-4 py-3 text-body-md text-primary hover:bg-surface-container-low dark:text-on-primary dark:hover:bg-inverse-surface" href="../bald_bold_6/code.html">Войти</a>' +
                '<button type="button" class="rounded-xl px-4 py-3 text-body-md text-primary hover:bg-surface-container-low dark:text-on-primary dark:hover:bg-inverse-surface flex items-center gap-3 text-left" data-bb-wishlist-mobile><span class="material-symbols-outlined text-[20px]">favorite</span>Избранное</button>' +
                '</nav>';
            header.after(panel);
        }

        function close() {
            panel.hidden = true;
            button.setAttribute('aria-expanded', 'false');
        }
        button.addEventListener('click', () => {
            panel.hidden = !panel.hidden;
            button.setAttribute('aria-expanded', String(!panel.hidden));
        });
        panel.addEventListener('click', (event) => {
            if (event.target.closest('a')) close();
        });
        const mobileWishlist = panel.querySelector('[data-bb-wishlist-mobile]');
        if (mobileWishlist) {
            mobileWishlist.addEventListener('click', () => {
                close();
                const trigger = document.querySelector('[data-bb-wishlist-open]');
                if (trigger) trigger.click();
            });
        }
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') close();
        });
    }

    function addSearchOverlay() {
        if (document.getElementById('bb-search-overlay')) return;
        const overlay = document.createElement('div');
        overlay.id = 'bb-search-overlay';
        overlay.hidden = true;
        overlay.className = 'fixed inset-0 z-[90] hidden items-start justify-center bg-primary/60 p-4 pt-20 backdrop-blur-sm';
        overlay.innerHTML = `
            <div class="w-full max-w-xl rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-lifted dark:border-outline/30 dark:bg-primary-container" role="dialog" aria-modal="true" aria-labelledby="bb-search-title">
                <div class="mb-4 flex items-center justify-between gap-4">
                    <h2 class="text-headline-sm font-headline-sm font-bold text-primary dark:text-on-primary" id="bb-search-title">Поиск по каталогу</h2>
                    <button type="button" class="bb-icon-btn w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low dark:text-outline-variant dark:hover:bg-inverse-surface" data-bb-search-close aria-label="Закрыть поиск">
                        <span class="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>
                <div class="flex gap-2">
                    <input id="bb-search-input" type="search" class="h-12 min-w-0 flex-1 rounded-xl border border-outline-variant bg-surface-container-low px-4 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-outline dark:bg-inverse-surface dark:text-on-primary" placeholder="Например: SPF 50, массажёр, подарок" />
                    <button type="button" class="h-12 rounded-xl bg-primary px-5 text-label-lg font-semibold text-on-primary hover:bg-brand-600 dark:bg-brand-400 dark:text-primary" data-bb-search-submit>Найти</button>
                </div>
                <div class="mt-4 flex flex-wrap gap-2 text-label-sm">
                    <button type="button" class="rounded-full border border-outline-variant/50 px-3 py-1.5 text-on-surface-variant hover:border-primary hover:text-primary dark:text-outline-variant" data-bb-search-suggest="SPF 50">SPF 50</button>
                    <button type="button" class="rounded-full border border-outline-variant/50 px-3 py-1.5 text-on-surface-variant hover:border-primary hover:text-primary dark:text-outline-variant" data-bb-search-suggest="подарок">Подарки</button>
                    <button type="button" class="rounded-full border border-outline-variant/50 px-3 py-1.5 text-on-surface-variant hover:border-primary hover:text-primary dark:text-outline-variant" data-bb-search-suggest="массажёр">Массажёр</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        const input = overlay.querySelector('#bb-search-input');
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay || event.target.closest('[data-bb-search-close]')) hideOverlay(overlay);
            const suggest = event.target.closest('[data-bb-search-suggest]');
            if (suggest) submitSearch(suggest.dataset.bbSearchSuggest);
            if (event.target.closest('[data-bb-search-submit]')) submitSearch(input.value);
        });
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') submitSearch(input.value);
        });
        overlay._input = input;
    }

    function openSearch(value) {
        const overlay = document.getElementById('bb-search-overlay');
        if (!overlay) return;
        if (typeof value === 'string' && value) overlay._input.value = value;
        overlay.classList.remove('hidden');
        showOverlay(overlay);
    }

    function submitSearch(value) {
        const query = String(value || '').trim();
        if (!query) {
            store.toast('Введите запрос для поиска', 'error');
            return;
        }
        const overlay = document.getElementById('bb-search-overlay');
        hideOverlay(overlay);
        if (overlay) overlay.classList.add('hidden');
        if (location.pathname.includes('bald_bold_2')) {
            window.dispatchEvent(new CustomEvent('bb:search', { detail: query }));
            return;
        }
        const target = new URL('../bald_bold_2/code.html', location.href);
        target.searchParams.set('q', query);
        location.href = target.href;
    }

    function addInfoModal() {
        if (document.getElementById('bb-info-modal')) return;
        const modal = document.createElement('div');
        modal.id = 'bb-info-modal';
        modal.hidden = true;
        modal.className = 'fixed inset-0 z-[90] hidden items-center justify-center bg-primary/60 p-4 backdrop-blur-sm';
        modal.innerHTML = `
            <div class="w-full max-w-lg rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-lifted dark:border-outline/30 dark:bg-primary-container" role="dialog" aria-modal="true" aria-labelledby="bb-info-title">
                <div class="mb-4 flex items-start justify-between gap-4">
                    <h2 class="text-headline-sm font-headline-sm font-bold text-primary dark:text-on-primary" id="bb-info-title"></h2>
                    <button type="button" class="bb-icon-btn w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low dark:text-outline-variant dark:hover:bg-inverse-surface" data-bb-info-close aria-label="Закрыть окно">
                        <span class="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>
                <div class="space-y-3 text-body-sm leading-relaxed text-on-surface-variant dark:text-outline-variant" id="bb-info-body"></div>
                <div class="mt-6 flex justify-end">
                    <button type="button" class="h-11 rounded-xl bg-primary px-5 text-label-lg font-semibold text-on-primary hover:bg-brand-600 dark:bg-brand-400 dark:text-primary" data-bb-info-close>Понятно</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target.closest('[data-bb-info-close]')) hideOverlay(modal);
        });
    }

    function openInfo(type) {
        const modal = document.getElementById('bb-info-modal');
        if (!modal) return;
        const content = INFO[type] || INFO.contacts;
        modal.querySelector('#bb-info-title').textContent = content.title;
        modal.querySelector('#bb-info-body').innerHTML = content.body;
        modal.classList.remove('hidden');
        showOverlay(modal);
    }

    function addProductModal() {
        if (document.getElementById('bb-product-modal')) return;
        const modal = document.createElement('div');
        modal.id = 'bb-product-modal';
        modal.hidden = true;
        modal.className = 'fixed inset-0 z-[95] hidden items-center justify-center bg-primary/60 p-3 backdrop-blur-sm sm:p-6';
        modal.innerHTML = `
            <div class="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-outline-variant/40 bg-surface-container-lowest shadow-lifted dark:border-outline/30 dark:bg-primary-container" role="dialog" aria-modal="true" aria-labelledby="bb-product-modal-title">
                <div class="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-outline-variant/30 bg-surface-container-lowest/95 px-5 py-3 backdrop-blur dark:border-outline/20 dark:bg-primary-container/95">
                    <p class="text-label-sm font-label-sm uppercase tracking-wider text-outline">Карточка товара</p>
                    <button type="button" class="bb-icon-btn w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low dark:text-outline-variant dark:hover:bg-inverse-surface" data-bb-product-close aria-label="Закрыть окно товара">
                        <span class="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>
                <div id="bb-product-modal-body" class="p-5 sm:p-7"></div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target.closest('[data-bb-product-close]')) {
                hideOverlay(modal);
                modal.classList.add('hidden');
                return;
            }
            const add = event.target.closest('[data-bb-modal-add]');
            if (add) {
                const product = PRODUCTS.find((item) => item.id === add.dataset.bbModalAdd);
                if (product) {
                    store.add(product, 1);
                    store.toast('Товар добавлен в корзину', 'success');
                }
                return;
            }
            const wish = event.target.closest('[data-bb-modal-wish]');
            if (wish) {
                const product = PRODUCTS.find((item) => item.id === wish.dataset.bbModalWish);
                if (product) store.toggleWishlist(product);
            }
        });
    }

    function openProduct(value) {
        const modal = document.getElementById('bb-product-modal');
        if (!modal) return;
        const id = typeof value === 'string' ? value : (value && (value.dataset.bbDetail || (cardFor(value) || {}).dataset?.bbProductId));
        const product = PRODUCTS.find((item) => item.id === id) || canonical(id);
        if (!product) return;
        const info = PRODUCT_INFO[product.id] || {};
        const category = info.category || product.category || 'Bald & Bold';
        const description = info.description || product.name;
        const specs = info.specs || product.tags || [];
        const reviews = info.reviews || 0;
        const inStock = info.stock !== false;
        const rating = Number(product.rating || 0);
        const filled = Math.max(0, Math.min(5, Math.round(rating)));
        const stars = Array.from({ length: 5 }, (_, index) => `<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' ${index < filled ? 1 : 0};">star</span>`).join('');
        modal.querySelector('#bb-product-modal-body').innerHTML = `
            <div class="grid gap-6 md:grid-cols-2">
                <div class="aspect-square rounded-2xl bg-[#F4F4F6] p-5 flex items-center justify-center dark:bg-[#24242b]">
                    <img class="max-h-full w-full object-contain" alt="${escapeHtml(product.name)}" src="${escapeHtml(product.image || '')}"/>
                </div>
                <div class="min-w-0 space-y-4">
                    <div>
                        <p class="text-label-sm font-label-sm uppercase tracking-wider text-outline">${escapeHtml(category)}</p>
                        <h2 class="mt-1 text-headline-md font-headline-md font-bold text-primary dark:text-on-primary" id="bb-product-modal-title">${escapeHtml(product.name)}</h2>
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                        <div class="flex text-[#F2A93B]">${stars}</div>
                        <span class="text-label-sm font-bold text-primary dark:text-on-primary">${rating.toFixed(1)}</span>
                        ${reviews ? `<span class="text-label-sm text-outline">(${reviews} отзывов)</span>` : ''}
                    </div>
                    <div class="flex flex-wrap items-center gap-3">
                        <span class="text-headline-md font-headline-md font-bold text-primary dark:text-on-primary">${escapeHtml(store.money(product.price))}</span>
                        <span class="badge-ui ${inStock ? 'bg-semantic-success/10 text-semantic-success' : 'bg-semantic-danger/10 text-semantic-danger'}">${inStock ? 'В наличии' : 'Нет в наличии'}</span>
                    </div>
                    <p class="text-body-sm leading-relaxed text-on-surface-variant dark:text-outline-variant">${escapeHtml(description)}</p>
                    <div>
                        <p class="mb-2 text-label-sm font-semibold text-primary dark:text-on-primary">Характеристики</p>
                        <div class="flex flex-wrap gap-2">${specs.map((spec) => `<span class="badge-ui bg-surface-container-high text-on-surface-variant dark:bg-surface-container-highest dark:text-outline-variant">${escapeHtml(spec)}</span>`).join('')}</div>
                    </div>
                    <div class="flex flex-wrap gap-3 pt-2">
                        <button type="button" class="bb-add-btn px-5" data-bb-modal-add="${escapeHtml(product.id)}" ${inStock ? '' : 'disabled'}>В корзину</button>
                        <button type="button" class="h-11 rounded-xl border border-outline-variant/60 px-4 text-label-lg font-semibold text-on-surface-variant hover:bg-surface-container-low dark:border-outline/30 dark:text-outline-variant dark:hover:bg-inverse-surface" data-bb-modal-wish="${escapeHtml(product.id)}">В избранное</button>
                    </div>
                    <a class="inline-flex items-center gap-1 text-label-sm font-semibold text-primary hover:underline dark:text-on-primary" href="../bald_bold_3/code.html?id=${encodeURIComponent(product.id)}">Открыть полную страницу товара <span class="material-symbols-outlined text-[16px]">arrow_forward</span></a>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
        showOverlay(modal, true);
    }

    function addWishlistUI() {
        if (location.pathname.includes('bald_bold_6') || document.getElementById('bb-wishlist-modal')) return;
        const actions = headerActions();
        if (!actions || document.querySelector('[data-bb-wishlist-open]')) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'bb-icon-btn relative hidden lg:inline-flex p-2 rounded-xl text-primary dark:text-on-primary hover:bg-surface-container-low dark:hover:bg-inverse-surface transition-colors';
        button.setAttribute('data-bb-wishlist-open', '');
        button.setAttribute('aria-label', 'Избранное');
        button.innerHTML = '<span class="material-symbols-outlined">favorite</span><span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-400 text-primary text-[10px] font-bold flex items-center justify-center hidden" data-bb-wishlist-count>0</span>';
        actions.appendChild(button);

        const modal = document.createElement('div');
        modal.id = 'bb-wishlist-modal';
        modal.hidden = true;
        modal.className = 'fixed inset-0 z-[90] hidden items-center justify-center bg-primary/60 p-4 backdrop-blur-sm';
        modal.innerHTML = `
            <div class="w-full max-w-lg rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-lifted dark:border-outline/30 dark:bg-primary-container" role="dialog" aria-modal="true" aria-labelledby="bb-wishlist-title">
                <div class="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <h2 class="text-headline-sm font-headline-sm font-bold text-primary dark:text-on-primary" id="bb-wishlist-title">Избранное</h2>
                        <p class="text-label-sm text-on-surface-variant dark:text-outline-variant">Ваши сохранённые средства</p>
                    </div>
                    <button type="button" class="bb-icon-btn w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low dark:text-outline-variant dark:hover:bg-inverse-surface" data-bb-wishlist-close aria-label="Закрыть избранное">
                        <span class="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>
                <div class="space-y-2 max-h-[55vh] overflow-y-auto" id="bb-wishlist-items"></div>
                <div class="mt-6 flex justify-end gap-2">
                    <a class="h-11 inline-flex items-center rounded-xl border border-outline-variant px-4 text-label-lg font-semibold text-primary hover:bg-surface-container-low dark:border-outline dark:text-on-primary" href="../bald_bold_2/code.html">В каталог</a>
                    <button type="button" class="h-11 rounded-xl bg-primary px-5 text-label-lg font-semibold text-on-primary hover:bg-brand-600 dark:bg-brand-400 dark:text-primary" data-bb-wishlist-close>Готово</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        button.addEventListener('click', () => {
            renderWishlistPanel();
            modal.classList.remove('hidden');
            showOverlay(modal, button);
        });
        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target.closest('[data-bb-wishlist-close]')) {
                hideOverlay(modal);
                modal.classList.add('hidden');
                return;
            }
            const remove = event.target.closest('[data-wish-remove]');
            if (remove) {
                const product = PRODUCTS.find((item) => item.id === remove.dataset.wishRemove);
                if (product) store.toggleWishlist(product);
            }
        });
        renderWishlist();
    }

    function wireSearch() {
        document.querySelectorAll('input[type="search"], input[placeholder*="поиск"], input[placeholder*="Поиск"]').forEach((input) => {
            if (input.dataset.bbSearch || input.dataset.dashboardSearch || input.hasAttribute('data-dashboard-search')) return;
            input.dataset.bbSearch = 'true';
            input.setAttribute('name', 'q');
            input.addEventListener('keydown', (event) => {
                if (event.key !== 'Enter') return;
                event.preventDefault();
                submitSearch(input.value);
            });
        });
        document.querySelectorAll('button[aria-label="Поиск"], button[title="Поиск"]').forEach((button) => {
            button.type = 'button';
            button.dataset.bbSearchButton = 'true';
            button.addEventListener('click', () => {
                const input = button.closest('header')?.querySelector('input[data-bb-search="true"]');
                openSearch(input && input.value ? input.value : '');
            });
        });
    }

    function wireDelegatedActions() {
        document.addEventListener('click', (event) => {
            if (event.target.closest('#bb-product-modal')) return;
            const info = event.target.closest('[data-bb-info]');
            if (info) {
                event.preventDefault();
                openInfo(info.dataset.bbInfo);
                return;
            }
            const add = event.target.closest('.bb-add-btn, [aria-label="В корзину"], [data-bb-add]');
            if (add && !add.closest('#checkout-cart, [data-step-panel="0"]')) {
                const card = cardFor(add);
                if (card && card.dataset.stock === 'false') {
                    store.toast('Товар временно отсутствует в наличии', 'error');
                    return;
                }
                const product = productFrom(add);
                if (product) {
                    store.add(product, Number(add.dataset.bbQty || 1));
                    add.classList.add('bb-added');
                    setTimeout(() => add.classList.remove('bb-added'), 1200);
                    return;
                }
            }
            const wish = event.target.closest('[title="В избранное"], [aria-label="Добавить в избранное"], [data-bb-wish]');
            if (wish) {
                const product = productFrom(wish);
                if (product) store.toggleWishlist(product);
                return;
            }
            const detail = event.target.closest('[data-bb-detail]');
            if (detail && !event.target.closest('button')) {
                event.preventDefault();
                openProduct(detail.dataset.bbDetail || (cardFor(detail) || {}).dataset?.bbProductId);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                hideOverlay(document.getElementById('bb-search-overlay'));
                const productModal = document.getElementById('bb-product-modal');
                if (productModal && !productModal.hidden) {
                    hideOverlay(productModal);
                    productModal.classList.add('hidden');
                }
            }
            if ((event.key === 'Enter' || event.key === ' ') && event.target.matches?.('[data-bb-detail][role="button"]')) {
                event.preventDefault();
                openProduct(event.target.dataset.bbDetail);
            }
        });

        document.querySelectorAll('form').forEach((form) => {
            if (!form.querySelector('input[type="email"]')) return;
            if (form.id === 'register-form' || form.id === 'login-form') return;
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const input = form.querySelector('input[type="email"]');
                const value = input.value.trim();
                if (!value) {
                    store.toast('Введите email для подписки', 'error');
                    input.focus();
                    return;
                }
                if (!input.checkValidity()) {
                    store.toast('Введите корректный email', 'error');
                    return;
                }
                store.toast('Спасибо! Вы подписаны на рассылку', 'success');
                form.reset();
            });
        });
    }

    function init() {
        addGlobalStyles();
        addToasts();
        addSearchOverlay();
        addInfoModal();
        addProductModal();
        prepareCards();
        addWishlistUI();
        addMobileMenu();
        wireSearch();
        wireDelegatedActions();
        renderBadges();
        renderWishlist();
        renderUser();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
