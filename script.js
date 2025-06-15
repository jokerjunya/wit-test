// ウィット診断テストアプリのメインロジック

// 問題データベース - 3軸スコア＋ウィット型対応
const questionBank = [
    {
        id: "interview_final",
        title: "面接ラストの一言",
        theme: "印象操作・空気読み・言葉の締めセンス",
        situation: "あなたは第一志望の企業の最終面接に臨んでいます。業界は老舗の安定企業で、面接官は60代のベテラン役員。ここまでの会話は終始和やかで、志望動機もスムーズに話せ、役員も「うんうん」と頷いてくれています。",
        question: '最後にこう聞かれました：「では、最後に何か一言あればどうぞ。」\n\n"ふつうに締めてもいいけど、何か印象に残すことを言いたい…"\nあなたなら、何と言う？',
        options: [
            { 
                id: "a", 
                text: "本日はありがとうございました。御社の魅力がより伝わりました。", 
                scores: { originality: 2, empathy: 5, improvisation: 2 },
                typeLabel: "誠実型"
            },
            { 
                id: "b", 
                text: "では、次にお会いするのは入社初日ですね（ニッコリ）", 
                scores: { originality: 3, empathy: 4, improvisation: 4 },
                typeLabel: "スマート締め型"
            },
            { 
                id: "c", 
                text: "この空間、居心地よかったです。また来たいです（笑）", 
                scores: { originality: 4, empathy: 4, improvisation: 3 },
                typeLabel: "癒し型"
            },
            { 
                id: "d", 
                text: "…面接官のネクタイ、すごく素敵でした。つい見惚れてました。", 
                scores: { originality: 5, empathy: 2, improvisation: 4 },
                typeLabel: "誉め外し型"
            },
            { 
                id: "e", 
                text: "じゃ、そろそろ面接官の方の番ですね？", 
                scores: { originality: 5, empathy: 1, improvisation: 5 },
                typeLabel: "攻め型"
            },
            { 
                id: "f", 
                text: "緊張しすぎて、今ここが夢じゃないか疑ってます（笑）", 
                scores: { originality: 4, empathy: 5, improvisation: 4 },
                typeLabel: "自己開示型"
            }
        ]
    },
    {
        id: "awkward_silence",
        title: "気まずい沈黙の切り抜け方",
        theme: "場の空気転換・即興対応・コミュニケーション力",
        situation: "初対面の人たちとの食事会で、政治の話で少し重い空気になってしまいました。みんな黙り込んで、気まずい沈黙が続いています。あなたも含めて5人のテーブルです。",
        question: "この気まずい空気を何とかしたい…あなたはどう行動しますか？",
        options: [
            { 
                id: "a", 
                text: "「あ、そういえばこのお店の前にタピオカ屋があったんですよ！」と話題転換", 
                scores: { originality: 2, empathy: 4, improvisation: 3 },
                typeLabel: "安全転換型"
            },
            { 
                id: "b", 
                text: "「重い話の後は軽い話！このテーブルで一番面白い失敗談は？」", 
                scores: { originality: 4, empathy: 4, improvisation: 4 },
                typeLabel: "仕切り型"
            },
            { 
                id: "c", 
                text: "「みんなで沈黙を楽しむ会、開催中！」とあえてネタにする", 
                scores: { originality: 5, empathy: 3, improvisation: 5 },
                typeLabel: "メタ型"
            },
            { 
                id: "d", 
                text: "そっと店員さんを呼んで「おすすめの飲み物を教えてください」", 
                scores: { originality: 3, empathy: 5, improvisation: 2 },
                typeLabel: "気遣い型"
            },
            { 
                id: "e", 
                text: "「政治の話の次は恋愛話でしょ！」と明るく宣言", 
                scores: { originality: 4, empathy: 2, improvisation: 4 },
                typeLabel: "直球型"
            },
            { 
                id: "f", 
                text: "黙ったまま笑顔でみんなの顔をキョロキョロ見回す", 
                scores: { originality: 5, empathy: 2, improvisation: 3 },
                typeLabel: "天然型"
            }
        ]
    },
    {
        id: "unexpected_compliment",
        title: "予想外の褒められ方への対応",
        theme: "謙遜・受け答え・自己表現",
        situation: "久しぶりに会った知人から「なんか雰囲気変わったね。前よりずっと魅力的になった！」と言われました。正直、自分では何が変わったかよくわかりません。",
        question: "この褒め言葉にどう返しますか？",
        options: [
            { 
                id: "a", 
                text: "ありがとうございます！でも具体的にどこが変わったんでしょう？", 
                scores: { originality: 2, empathy: 4, improvisation: 2 },
                typeLabel: "素直型"
            },
            { 
                id: "b", 
                text: "えー、そんなことないですよ〜。きっと照明のせいです（笑）", 
                scores: { originality: 3, empathy: 5, improvisation: 3 },
                typeLabel: "謙遜型"
            },
            { 
                id: "c", 
                text: "ついに気づいてくれましたね！実は毎日努力してたんです", 
                scores: { originality: 4, empathy: 3, improvisation: 4 },
                typeLabel: "ノリノリ型"
            },
            { 
                id: "d", 
                text: "それ、10人に言って回ってるでしょ？（笑顔でツッコミ）", 
                scores: { originality: 5, empathy: 3, improvisation: 5 },
                typeLabel: "ツッコミ型"
            },
            { 
                id: "e", 
                text: "変わったのは髪型だけなんですけど…効果絶大ですね！", 
                scores: { originality: 3, empathy: 4, improvisation: 4 },
                typeLabel: "分析型"
            },
            { 
                id: "f", 
                text: "魅力的って言葉、久しぶりに聞きました…ありがとうございます", 
                scores: { originality: 4, empathy: 5, improvisation: 3 },
                typeLabel: "しみじみ型"
            }
        ]
    },
    {
        id: "group_photo_pose",
        title: "集合写真でのポーズ選択",
        theme: "場の読み・キャラ立ち・協調性",
        situation: "会社の歓送迎会で集合写真を撮ることになりました。20人ほどの集まりで、あなたは後列の端っこに立っています。カメラマンが「はい、みなさん自由にポーズしてください！」と言いました。",
        question: "周りのみんなが思い思いのポーズをとる中、あなたはどうしますか？",
        options: [
            { 
                id: "a", 
                text: "普通にピースサインで無難に", 
                scores: { originality: 1, empathy: 5, improvisation: 2 },
                typeLabel: "安定型"
            },
            { 
                id: "b", 
                text: "隣の人と一緒にハートマークを作る", 
                scores: { originality: 3, empathy: 4, improvisation: 3 },
                typeLabel: "協調型"
            },
            { 
                id: "c", 
                text: "両手を上げて「バンザイ！」のポーズ", 
                scores: { originality: 4, empathy: 3, improvisation: 4 },
                typeLabel: "元気型"
            },
            { 
                id: "d", 
                text: "こっそり後ろの人の頭上に「うさぎの耳」を作る", 
                scores: { originality: 5, empathy: 2, improvisation: 5 },
                typeLabel: "いたずら型"
            },
            { 
                id: "e", 
                text: "決めポーズで格好つける", 
                scores: { originality: 4, empathy: 2, improvisation: 3 },
                typeLabel: "スター型"
            },
            { 
                id: "f", 
                text: "変顔で写真を面白くする", 
                scores: { originality: 5, empathy: 3, improvisation: 4 },
                typeLabel: "エンターテイナー型"
            }
        ]
    },
    {
        id: "late_excuse",
        title: "遅刻の言い訳",
        theme: "とっさの機転・印象管理・ユーモア活用",
        situation: "重要な会議に15分遅刻してしまいました。理由は単純に寝坊です。会議室に入ると、上司と同僚10名ほどが振り返ってあなたを見ています。",
        question: "「どうしたの？」と聞かれました。あなたの第一声は？",
        options: [
            { 
                id: "a", 
                text: "申し訳ありません。電車が遅れまして…", 
                scores: { originality: 1, empathy: 3, improvisation: 2 },
                typeLabel: "定番嘘型"
            },
            { 
                id: "b", 
                text: "すみません、完全に寝坊しました。言い訳はありません", 
                scores: { originality: 3, empathy: 4, improvisation: 2 },
                typeLabel: "正直型"
            },
            { 
                id: "c", 
                text: "大変失礼しました。重要な会議だったので逆に緊張して眠れませんでした", 
                scores: { originality: 4, empathy: 3, improvisation: 4 },
                typeLabel: "皮肉型"
            },
            { 
                id: "d", 
                text: "時間通りに来ると思っていたら大間違いです！（堂々と）", 
                scores: { originality: 5, empathy: 1, improvisation: 5 },
                typeLabel: "開き直り型"
            },
            { 
                id: "e", 
                text: "みなさんが集まっているということは…まだ会議始まってませんね？", 
                scores: { originality: 4, empathy: 2, improvisation: 4 },
                typeLabel: "とぼけ型"
            },
            { 
                id: "f", 
                text: "遅刻という概念を超越した新しい時間軸で生きています", 
                scores: { originality: 5, empathy: 2, improvisation: 5 },
                typeLabel: "哲学型"
            }
        ]
    },
    {
        id: "elevator_awkward",
        title: "エレベーターでの微妙な状況",
        theme: "気まずさ回避・場の空気作り・コミュニケーション",
        situation: "オフィスビルのエレベーターに乗ったら、知り合いではないけれど何度か見かけたことがある人と二人きりになりました。20階まで約1分間、無言の時間が続いています。",
        question: "この状況をどう過ごしますか？",
        options: [
            { 
                id: "a", 
                text: "スマホを見て時間をやり過ごす", 
                scores: { originality: 1, empathy: 2, improvisation: 1 },
                typeLabel: "回避型"
            },
            { 
                id: "b", 
                text: "「今日は良い天気ですね」と天気の話をする", 
                scores: { originality: 2, empathy: 4, improvisation: 3 },
                typeLabel: "定番型"
            },
            { 
                id: "c", 
                text: "「このエレベーター、BGMがあったらいいのに」とつぶやく", 
                scores: { originality: 4, empathy: 3, improvisation: 4 },
                typeLabel: "場面転換型"
            },
            { 
                id: "d", 
                text: "階数ボタンを見て「全部押してみたい衝動に駆られませんか？」", 
                scores: { originality: 5, empathy: 2, improvisation: 5 },
                typeLabel: "共感誘発型"
            },
            { 
                id: "e", 
                text: "軽く会釈して微笑む", 
                scores: { originality: 2, empathy: 5, improvisation: 2 },
                typeLabel: "礼儀型"
            },
            { 
                id: "f", 
                text: "「エレベーターって密室ですよね…」と意味深に言う", 
                scores: { originality: 5, empathy: 1, improvisation: 4 },
                typeLabel: "謎かけ型"
            }
        ]
    },
    {
        id: "food_disaster",
        title: "食事中の失敗",
        theme: "リカバリー・自己フォロー・場の緊張緩和",
        situation: "大切な人との食事中、パスタを食べていたらソースが白いシャツに跳ねてしまいました。相手も気づいて心配そうな顔をしています。",
        question: "この状況にどう対応しますか？",
        options: [
            { 
                id: "a", 
                text: "「すみません、お手洗いに行ってきます」と席を立つ", 
                scores: { originality: 2, empathy: 4, improvisation: 2 },
                typeLabel: "対処型"
            },
            { 
                id: "b", 
                text: "「シャツがパスタを食べたがってたみたいです」と笑い飛ばす", 
                scores: { originality: 4, empathy: 4, improvisation: 5 },
                typeLabel: "自虐ユーモア型"
            },
            { 
                id: "c", 
                text: "「これで今日のファッションが完成しました」とポーズを決める", 
                scores: { originality: 5, empathy: 3, improvisation: 4 },
                typeLabel: "ポジティブ型"
            },
            { 
                id: "d", 
                text: "気づかないふりをして食事を続ける", 
                scores: { originality: 1, empathy: 1, improvisation: 1 },
                typeLabel: "無視型"
            },
            { 
                id: "e", 
                text: "「トマトソースのタトゥーです」と説明する", 
                scores: { originality: 5, empathy: 2, improvisation: 5 },
                typeLabel: "ウィット型"
            },
            { 
                id: "f", 
                text: "「すみません、緊張してしまって…」と素直に謝る", 
                scores: { originality: 2, empathy: 5, improvisation: 2 },
                typeLabel: "誠実型"
            }
        ]
    },
    {
        id: "presentation_tech_trouble",
        title: "プレゼン中の機器トラブル",
        theme: "危機管理・即興対応・プレッシャー下の判断",
        situation: "重要なプレゼンテーション中、スライドが突然動かなくなりました。聴衆20名が待っています。IT担当者は「復旧に5分程度かかります」と言っています。",
        question: "この時間をどう活用しますか？",
        options: [
            { 
                id: "a", 
                text: "「少々お待ちください」と言って復旧を待つ", 
                scores: { originality: 1, empathy: 3, improvisation: 1 },
                typeLabel: "待機型"
            },
            { 
                id: "b", 
                text: "スライドなしで要点を口頭で説明する", 
                scores: { originality: 3, empathy: 4, improvisation: 4 },
                typeLabel: "臨機応変型"
            },
            { 
                id: "c", 
                text: "「これも含めてプレゼンです。機器に頼らない真のコミュニケーションをお見せします」", 
                scores: { originality: 5, empathy: 3, improvisation: 5 },
                typeLabel: "逆手型"
            },
            { 
                id: "d", 
                text: "「皆さんに質問です。今日の朝ごはんは何でしたか？」とアイスブレイク", 
                scores: { originality: 4, empathy: 5, improvisation: 4 },
                typeLabel: "場つなぎ型"
            },
            { 
                id: "e", 
                text: "ホワイトボードに図を描きながら説明を続ける", 
                scores: { originality: 3, empathy: 4, improvisation: 5 },
                typeLabel: "代替手段型"
            },
            { 
                id: "f", 
                text: "「機械は正直ですね。私のプレゼンが退屈だと感じて寝てしまいました」", 
                scores: { originality: 5, empathy: 4, improvisation: 4 },
                typeLabel: "自虐ユーモア型"
            }
        ]
    },
    {
        id: "wrong_name_call",
        title: "名前間違いの対応",
        theme: "間違い訂正・相手への配慮・印象管理",
        situation: "新しい職場で、上司が3回続けてあなたの名前を間違えて呼んでいます。周りの同僚も気づいているようです。",
        question: "どのタイミングで、どう訂正しますか？",
        options: [
            { 
                id: "a", 
                text: "すぐに「すみません、正しくは○○です」と訂正する", 
                scores: { originality: 2, empathy: 3, improvisation: 3 },
                typeLabel: "直接型"
            },
            { 
                id: "b", 
                text: "会話の後で個別に「お疲れ様です。○○です」と改めて自己紹介", 
                scores: { originality: 3, empathy: 5, improvisation: 3 },
                typeLabel: "配慮型"
            },
            { 
                id: "c", 
                text: "「その名前も素敵ですが、実は○○なんです」と笑顔で", 
                scores: { originality: 4, empathy: 4, improvisation: 4 },
                typeLabel: "ソフト訂正型"
            },
            { 
                id: "d", 
                text: "間違った名前で呼ばれたときだけ反応しないでいる", 
                scores: { originality: 2, empathy: 2, improvisation: 2 },
                typeLabel: "消極的抵抗型"
            },
            { 
                id: "e", 
                text: "「改名を検討します」と冗談めかして訂正", 
                scores: { originality: 5, empathy: 3, improvisation: 5 },
                typeLabel: "ユーモア型"
            },
            { 
                id: "f", 
                text: "しばらく様子を見て、相手が気づくまで待つ", 
                scores: { originality: 1, empathy: 3, improvisation: 1 },
                typeLabel: "忍耐型"
            }
        ]
    },
    {
        id: "overheard_gossip",
        title: "立ち聞きしてしまった状況",
        theme: "倫理的判断・気まずさ処理・人間関係",
        situation: "休憩室で飲み物を取ろうとしたら、同僚2人があなたについて話しているのが聞こえてしまいました。内容は特に悪いものではありませんが、気づかれていません。",
        question: "この状況にどう対処しますか？",
        options: [
            { 
                id: "a", 
                text: "そっと立ち去って、何も聞かなかったことにする", 
                scores: { originality: 2, empathy: 4, improvisation: 2 },
                typeLabel: "回避型"
            },
            { 
                id: "b", 
                text: "わざと大きな音を立てて存在をアピール", 
                scores: { originality: 3, empathy: 3, improvisation: 3 },
                typeLabel: "間接アピール型"
            },
            { 
                id: "c", 
                text: "「良い評価をありがとうございます」と明るく入室", 
                scores: { originality: 4, empathy: 3, improvisation: 5 },
                typeLabel: "オープン型"
            },
            { 
                id: "d", 
                text: "「主役の登場です！」と大げさに現れる", 
                scores: { originality: 5, empathy: 2, improvisation: 5 },
                typeLabel: "エンターテイナー型"
            },
            { 
                id: "e", 
                text: "咳払いをして存在を知らせてから入室", 
                scores: { originality: 2, empathy: 5, improvisation: 3 },
                typeLabel: "礼儀型"
            },
            { 
                id: "f", 
                text: "後で「何かいい話をしてくれてたみたいですね」と軽く触れる", 
                scores: { originality: 4, empathy: 4, improvisation: 4 },
                typeLabel: "後出し型"
            }
        ]
    }
];

// ウィット型の定義
const witTypes = {
    "誠実型": { emoji: "😌", description: "真面目で信頼される" },
    "スマート締め型": { emoji: "😎", description: "バランス感覚に優れる" },
    "癒し型": { emoji: "😊", description: "場を和ませる力がある" },
    "誉め外し型": { emoji: "😅", description: "予想外の視点で魅力を伝える" },
    "攻め型": { emoji: "😏", description: "大胆で印象に残る" },
    "自己開示型": { emoji: "😄", description: "親しみやすさで勝負する" },
    "安全転換型": { emoji: "🤗", description: "リスクを避けつつ状況を改善" },
    "仕切り型": { emoji: "👑", description: "場をリードする力がある" },
    "メタ型": { emoji: "🧠", description: "状況を客観視する知性" },
    "気遣い型": { emoji: "💝", description: "細やかな配慮ができる" },
    "直球型": { emoji: "⚡", description: "ストレートで分かりやすい" },
    "天然型": { emoji: "🌸", description: "独特の存在感がある" },
    "素直型": { emoji: "✨", description: "純粋で好感度が高い" },
    "謙遜型": { emoji: "🙏", description: "控えめで上品な印象" },
    "ノリノリ型": { emoji: "🎉", description: "ポジティブなエネルギーがある" },
    "ツッコミ型": { emoji: "🔍", description: "鋭い観察力と反応力" },
    "分析型": { emoji: "📊", description: "論理的で説得力がある" },
    "しみじみ型": { emoji: "🍃", description: "深みのある人間性" },
    "安定型": { emoji: "⚖️", description: "安心感を与える存在" },
    "協調型": { emoji: "🤝", description: "チームワークを大切にする" },
    "元気型": { emoji: "💪", description: "明るいエネルギーで場を盛り上げる" },
    "いたずら型": { emoji: "😈", description: "遊び心で場を楽しくする" },
    "スター型": { emoji: "⭐", description: "注目を集める魅力がある" },
    "エンターテイナー型": { emoji: "🎭", description: "人を楽しませる才能" },
    "定番嘘型": { emoji: "😬", description: "無難だが印象が薄い" },
    "正直型": { emoji: "💯", description: "誠実さで信頼を得る" },
    "皮肉型": { emoji: "😉", description: "ウィットに富んだ表現力" },
    "開き直り型": { emoji: "🦁", description: "堂々とした態度で印象づける" },
    "とぼけ型": { emoji: "🤔", description: "独特のユーモアセンス" },
    "哲学型": { emoji: "🎓", description: "深い思考で場を驚かせる" },
    "回避型": { emoji: "🚪", description: "トラブルを避ける判断力" },
    "定番型": { emoji: "📖", description: "安心感のある対応力" },
    "場面転換型": { emoji: "🎬", description: "状況を変える発想力" },
    "共感誘発型": { emoji: "🤝", description: "相手の気持ちを引き出す" },
    "礼儀型": { emoji: "🙇", description: "品格のある振る舞い" },
    "謎かけ型": { emoji: "❓", description: "ミステリアスな魅力" },
    "対処型": { emoji: "🛠️", description: "的確な問題解決能力" },
    "自虐ユーモア型": { emoji: "😂", description: "自分をネタにする余裕" },
    "ポジティブ型": { emoji: "☀️", description: "前向きな思考力" },
    "無視型": { emoji: "😶", description: "動じない精神力" },
    "ウィット型": { emoji: "💡", description: "機転の利いた表現力" },
    "待機型": { emoji: "⏳", description: "慎重な判断力" },
    "臨機応変型": { emoji: "🎯", description: "状況に合わせた対応力" },
    "逆手型": { emoji: "🔄", description: "マイナスをプラスに変える力" },
    "場つなぎ型": { emoji: "🎪", description: "場を盛り上げる技術" },
    "代替手段型": { emoji: "🔧", description: "別の方法を見つける創造力" },
    "直接型": { emoji: "🎯", description: "率直なコミュニケーション" },
    "配慮型": { emoji: "💖", description: "相手を思いやる心" },
    "ソフト訂正型": { emoji: "🌸", description: "優しく指摘する技術" },
    "消極的抵抗型": { emoji: "🤐", description: "静かな主張力" },
    "忍耐型": { emoji: "🧘", description: "我慢強い性格" },
    "間接アピール型": { emoji: "🔔", description: "さりげない存在感" },
    "オープン型": { emoji: "🌟", description: "オープンなコミュニケーション" },
    "後出し型": { emoji: "⏰", description: "タイミングを見極める力" }
};

// 稽古メニューの定義
const trainingMenus = {
    originality: [
        "日常の出来事を3つの異なる視点で表現してみる",
        "身の回りのモノに勝手にキャッチコピーをつける練習",
        "「普通ならこう言うけど、自分ならこう言う」パターンを考える",
        "比喩表現のストックを増やす（例：忙しい→ハムスターより回ってる）"
    ],
    empathy: [
        "相手の感情を3段階で読み取る練習（表面・中間・深層）",
        "場の雰囲気を色で表現してみる",
        "「この人は今何を求めているか？」を推測するゲーム",
        "TPOに合わせた言葉選びの練習"
    ],
    improvisation: [
        "5秒以内に3つの選択肢を考える練習",
        "「もし〜だったら」の即興シミュレーション",
        "とっさの一言日記をつける",
        "即興で短い物語を作る練習"
    ]
};

// アプリの状態管理
class WitTest {
    constructor() {
        this.currentQuestionIndex = 0;
        this.selectedQuestions = [];
        this.answers = [];
        this.scores = { originality: 0, empathy: 0, improvisation: 0 };
        this.typeLabels = [];
        
        // 新機能のフラグ
        this.isTimerMode = false;
        this.timeLimit = 10; // 秒
        this.timeRemaining = 0;
        this.timer = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showScreen('start-screen');
    }

    bindEvents() {
        // モード選択ボタン
        document.getElementById('normal-mode-btn').addEventListener('click', () => {
            this.setMode(false);
        });
        
        document.getElementById('timer-mode-btn').addEventListener('click', () => {
            this.setMode(true);
        });

        // スタートボタン
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startTest();
        });

        // リスタートボタン
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });

        // 共有ボタン
        document.getElementById('share-twitter-btn').addEventListener('click', () => {
            this.shareToTwitter();
        });

        document.getElementById('share-line-btn').addEventListener('click', () => {
            this.shareToLine();
        });
    }

    setMode(isTimer) {
        this.isTimerMode = isTimer;
        
        // ボタンの状態更新
        document.getElementById('normal-mode-btn').classList.toggle('active', !isTimer);
        document.getElementById('timer-mode-btn').classList.toggle('active', isTimer);
    }

    showScreen(screenId) {
        // すべての画面を非表示
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // 指定された画面を表示
        document.getElementById(screenId).classList.add('active');
    }

    startTest() {
        // ランダムに5問を選択
        this.selectedQuestions = this.selectRandomQuestions(questionBank, 5);
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.scores = { originality: 0, empathy: 0, improvisation: 0 };
        this.typeLabels = [];
        
        this.showQuestion();
        this.showScreen('question-screen');
    }

    selectRandomQuestions(questions, count) {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    showQuestion() {
        const question = this.selectedQuestions[this.currentQuestionIndex];
        
        // プログレスバーの更新
        const progress = ((this.currentQuestionIndex + 1) / this.selectedQuestions.length) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';

        // 問題番号の更新
        document.getElementById('question-number').textContent = 
            `問題 ${this.currentQuestionIndex + 1}/${this.selectedQuestions.length}`;

        // タイマー表示の制御
        const timerDisplay = document.getElementById('timer-display');
        if (this.isTimerMode) {
            timerDisplay.style.display = 'block';
            this.startTimer();
        } else {
            timerDisplay.style.display = 'none';
        }

        // 問題文の更新（シチュエーション + 問題）
        const questionContainer = document.getElementById('question-text');
        questionContainer.innerHTML = `
            <div class="question-title">${question.title}</div>
            <div class="question-theme">${question.theme}</div>
            <div class="question-situation">${question.situation}</div>
            <div class="question-main">${question.question}</div>
        `;

        // 選択肢の生成（6択対応）
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'btn option';
            button.innerHTML = `
                <span class="option-id">${option.id.toUpperCase()}</span>
                <span class="option-text">${option.text}</span>
            `;
            button.addEventListener('click', () => {
                this.selectAnswer(index);
            });
            optionsContainer.appendChild(button);
        });
    }

    startTimer() {
        this.timeRemaining = this.timeLimit;
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            
            if (this.timeRemaining <= 0) {
                this.timeOut();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        document.getElementById('timer-seconds').textContent = this.timeRemaining;
        
        // 色を変更（5秒以下で警告色）
        const timerDisplay = document.getElementById('timer-display');
        if (this.timeRemaining <= 5) {
            timerDisplay.style.background = '#ff4757';
        } else {
            timerDisplay.style.background = '#ff6b6b';
        }
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    timeOut() {
        this.stopTimer();
        // ランダムに選択肢を選ぶ
        const randomIndex = Math.floor(Math.random() * 6);
        this.selectAnswer(randomIndex);
    }

    selectAnswer(optionIndex) {
        // タイマーを停止
        this.stopTimer();
        
        const question = this.selectedQuestions[this.currentQuestionIndex];
        const selectedOption = question.options[optionIndex];
        
        // 回答を記録
        this.answers.push({
            questionId: question.id,
            questionTitle: question.title,
            optionId: selectedOption.id,
            optionText: selectedOption.text,
            scores: selectedOption.scores,
            typeLabel: selectedOption.typeLabel,
            timeTaken: this.isTimerMode ? (this.timeLimit - this.timeRemaining) : null
        });

        // 3軸スコアに加算
        this.scores.originality += selectedOption.scores.originality;
        this.scores.empathy += selectedOption.scores.empathy;
        this.scores.improvisation += selectedOption.scores.improvisation;

        // ウィット型を記録
        this.typeLabels.push(selectedOption.typeLabel);

        // 次の問題へ、または結果表示
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.selectedQuestions.length) {
            // 次の問題を表示
            setTimeout(() => {
                this.showQuestion();
            }, 300);
        } else {
            // 結果を表示
            setTimeout(() => {
                this.showResult();
            }, 300);
        }
    }

    showResult() {
        // 3軸スコアを偏差値風に変換（5-25点 → 40-80点）
        const maxPossibleScore = this.selectedQuestions.length * 5;
        const convertedScores = {
            originality: Math.round(40 + (this.scores.originality / maxPossibleScore) * 40),
            empathy: Math.round(40 + (this.scores.empathy / maxPossibleScore) * 40),
            improvisation: Math.round(40 + (this.scores.improvisation / maxPossibleScore) * 40)
        };

        // 最も多いウィット型を特定
        const typeCounts = {};
        this.typeLabels.forEach(type => {
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
        
        const primaryType = Object.keys(typeCounts).reduce((a, b) => 
            typeCounts[a] > typeCounts[b] ? a : b
        );

        // 結果をLocalStorageに保存
        this.saveResults(convertedScores, primaryType, typeCounts);

        // 結果の表示
        this.displayResults(convertedScores, primaryType, typeCounts);
        this.showScreen('result-screen');
    }

    saveResults(scores, primaryType, typeCounts) {
        const results = {
            timestamp: new Date().toISOString(),
            mode: this.isTimerMode ? 'timer' : 'normal',
            scores: scores,
            primaryType: primaryType,
            typeCounts: typeCounts,
            answers: this.answers
        };

        // LocalStorageに保存
        const savedResults = JSON.parse(localStorage.getItem('witTestResults') || '[]');
        savedResults.push(results);
        
        // 最新10件のみ保持
        if (savedResults.length > 10) {
            savedResults.splice(0, savedResults.length - 10);
        }
        
        localStorage.setItem('witTestResults', JSON.stringify(savedResults));
        localStorage.setItem('latestWitTestResult', JSON.stringify(results));
    }

    shareToTwitter() {
        const latestResult = JSON.parse(localStorage.getItem('latestWitTestResult') || '{}');
        const primaryType = latestResult.primaryType || '未診断';
        const scores = latestResult.scores || {};
        const totalScore = Math.round((scores.originality + scores.empathy + scores.improvisation) / 3);
        
        const text = `🧠 ウィット診断テスト結果\n\n🏷️ ${primaryType}\n📊 総合スコア: ${totalScore}\n🎯 独自性: ${scores.originality}\n💖 共感性: ${scores.empathy}\n⚡ 即興性: ${scores.improvisation}\n\n#ウィット診断 #診断テスト`;
        
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
    }

    shareToLine() {
        const latestResult = JSON.parse(localStorage.getItem('latestWitTestResult') || '{}');
        const primaryType = latestResult.primaryType || '未診断';
        const scores = latestResult.scores || {};
        const totalScore = Math.round((scores.originality + scores.empathy + scores.improvisation) / 3);
        
        const text = `🧠 ウィット診断テスト結果\n\n🏷️ ${primaryType}\n📊 総合スコア: ${totalScore}\n\nあなたも診断してみませんか？`;
        
        const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    }

    displayResults(scores, primaryType, typeCounts) {
        const resultContainer = document.getElementById('result-description');
        
        // ウィット型情報
        const typeInfo = witTypes[primaryType];
        
        // 最も低いスキルを特定（稽古メニュー用）
        const lowestSkill = Object.keys(scores).reduce((a, b) => 
            scores[a] < scores[b] ? a : b
        );

        resultContainer.innerHTML = `
            <div class="result-primary-type">
                <h3>${typeInfo.emoji} ${primaryType}</h3>
                <p>${typeInfo.description}</p>
            </div>

            <div class="score-breakdown">
                <h4>🎯 あなたのウィット能力</h4>
                <div class="score-bars">
                    <div class="score-bar">
                        <span class="score-label">独自性 (Originality)</span>
                        <div class="score-bar-bg">
                            <div class="score-bar-fill" style="width: ${scores.originality}%"></div>
                        </div>
                        <span class="score-value">${scores.originality}</span>
                    </div>
                    <div class="score-bar">
                        <span class="score-label">共感性 (Empathy)</span>
                        <div class="score-bar-bg">
                            <div class="score-bar-fill" style="width: ${scores.empathy}%"></div>
                        </div>
                        <span class="score-value">${scores.empathy}</span>
                    </div>
                    <div class="score-bar">
                        <span class="score-label">即興性 (Improvisation)</span>
                        <div class="score-bar-bg">
                            <div class="score-bar-fill" style="width: ${scores.improvisation}%"></div>
                        </div>
                        <span class="score-value">${scores.improvisation}</span>
                    </div>
                </div>
            </div>

            <div class="wit-spectrum">
                <h4>🌈 あなたのウィット型スペクトラム</h4>
                <div class="type-tags">
                    ${Object.keys(typeCounts).map(type => {
                        const count = typeCounts[type];
                        const typeData = witTypes[type];
                        return `<span class="type-tag ${type === primaryType ? 'primary' : ''}">${typeData.emoji} ${type} (${count})</span>`;
                    }).join('')}
                </div>
            </div>

            <div class="training-menu">
                <h4>💪 おすすめ稽古メニュー</h4>
                <p><strong>${lowestSkill === 'originality' ? '独自性' : lowestSkill === 'empathy' ? '共感性' : '即興性'}を伸ばすトレーニング：</strong></p>
                <ul>
                    ${trainingMenus[lowestSkill].slice(0, 2).map(menu => `<li>${menu}</li>`).join('')}
                </ul>
            </div>
        `;

        // 総合スコアの表示
        const totalScore = Math.round((scores.originality + scores.empathy + scores.improvisation) / 3);
        document.getElementById('total-score').textContent = totalScore;
    }

    restart() {
        this.showScreen('start-screen');
    }
}

// アプリケーションの開始
document.addEventListener('DOMContentLoaded', () => {
    new WitTest();
}); 