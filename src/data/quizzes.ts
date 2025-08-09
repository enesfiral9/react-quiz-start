export type Quiz = {
  slug: string;
  title: string;
  description: string;
};

export type Category = {
  slug: 'react' | 'react-native';
  title: string;
  quizzes: Quiz[];
};

export const CATEGORIES: Category[] = [
  {
    slug: 'react',
    title: 'React JS Quizzes',
    quizzes: [
      {
        slug: 'react-basics',
        title: 'React Basics Quiz',
        description: 'Test your knowledge of React basics with this quiz.'
      },
      {
        slug: 'component-lifecycle',
        title: 'Component lifecycle',
        description: 'Explore Component lifecycle'
      },
      {
        slug: 'hooks',
        title: 'Hooks',
        description: 'Explore Hooks'
      },
      {
        slug: 'performance-optimization',
        title: 'Performance optimization',
        description: 'Explore Performance optimization'
      },
      {
        slug: 'react-patterns',
        title: 'React patterns',
        description: 'Explore React patterns'
      },
      {
        slug: 'react-router',
        title: 'React router',
        description: 'Explore React router'
      }
    ]
  },
  {
    slug: 'react-native',
    title: 'React Native Quizzes',
    quizzes: [
      {
        slug: 'rn-state-management',
        title: 'State Management Quiz for React Native',
        description:
          'Test your knowledge of state management in React Native with this quiz.'
      },
      {
        slug: 'rn-performance-optimization',
        title: 'Performance Optimization in React Native',
        description:
          'Test your knowledge of performance optimization in React Native with this quiz.'
      },
      {
        slug: 'rn-navigation',
        title: 'React Native Navigation',
        description:
          'Test your knowledge of navigation in React Native with this quiz.'
      },
      {
        slug: 'rn-device-features',
        title: 'Device Features Integration in React Native',
        description:
          'Test your knowledge of integrating device features in React Native apps with this quiz.'
      },
      {
        slug: 'rn-debugging-testing',
        title: 'Debugging and Testing in React Native',
        description:
          'Test your knowledge of debugging and testing in React Native with this quiz.'
      },
      {
        slug: 'rn-components-ui',
        title: 'React Native Components and UI',
        description:
          'Test your knowledge of React Native components and user interface elements.'
      },
      {
        slug: 'rn-component-lifecycle',
        title: 'React Native Component Lifecycle',
        description:
          'Test your knowledge of the component lifecycle in React Native.'
      },
      {
        slug: 'rn-api-integration',
        title: 'API Integration in React Native',
        description:
          'Test your knowledge of API integration in React Native with this quiz!'
      }
    ]
  }
];

export type Question = {
  id: string;
  q: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

// A compact shared pool used for all quizzes for now.
export const BASE_QUESTIONS: Question[] = [
  {
    id: 'q1',
    q: 'React bileşenlerinde state güncellemeleri neden asenkron olabilir?',
    options: [
      'DOM güncellemelerini toplu hale getirmek ve performansı artırmak için',
      'JavaScript tek iş parçacıklı olduğu için',
      'Tarayıcı kısıtlamaları nedeniyle',
      'Node.js gerektirdiği için'
    ],
    correctIndex: 0,
    explanation:
      'React setState/useState güncellemelerini olay döngüsü içinde toplu (batched) işleyerek daha az render ile performansı artırır.'
  },
  {
    id: 'q2',
    q: 'useEffect kancası ne zaman çalışır?',
    options: [
      'Render öncesi, senkron şekilde',
      'Render sonrası, bağımlılıklara göre',
      'Sadece ilk mount olduğunda',
      'Sadece unmount olurken'
    ],
    correctIndex: 1
  },
  {
    id: 'q3',
    q: 'React Router’da sayfa değiştirmek için hangi bileşen kullanılır?',
    options: ['Link', 'Form', 'Navigate', 'Switch'],
    correctIndex: 0
  },
  {
    id: 'q4',
    q: 'Memoization için doğru eşleşme hangisidir?',
    options: [
      'useEffect -> hesaplama önbelleği',
      'useMemo -> hesaplama önbelleği',
      'useRef -> state yönetimi',
      'useCallback -> DOM güncelleme'
    ],
    correctIndex: 1
  },
  {
    id: 'q5',
    q: 'Controlled component nedir?',
    options: [
      'Değeri DOM tarafından yönetilen form elemanı',
      'Değeri React state tarafından yönetilen form elemanı',
      'Hiç state kullanmayan bileşen',
      'Sadece sunucu tarafında render edilen bileşen'
    ],
    correctIndex: 1
  },
  {
    id: 'q6',
    q: 'React Native’de stil tanımları hangi yapıya benzer?',
    options: ['CSS', 'Tailwind', 'Flexbox tabanlı JS nesneleri', 'Sass'],
    correctIndex: 2
  },
  {
    id: 'q7',
    q: 'Context API ne için kullanılır?',
    options: [
      'Bileşenler arasında prop drilling olmadan veri paylaşmak için',
      'Sadece router ayarları için',
      'Sadece stil yönetimi için',
      'Sadece test yazmak için'
    ],
    correctIndex: 0
  },
  {
    id: 'q8',
    q: 'Performans için hangi teknik doğrudur?',
    options: [
      'Her render’da yeni fonksiyon oluşturmak',
      'Gereksiz render’ları azaltmak için memoization kullanmak',
      'Tüm verileri tek bir state içinde tutmak',
      'Key kullanmamak'
    ],
    correctIndex: 1
  }
];

export function getAllQuizzes() {
  return CATEGORIES.flatMap((c) => c.quizzes.map((q) => ({ ...q, category: c.slug })));
}

export function findQuizBySlug(slug: string) {
  for (const cat of CATEGORIES) {
    const q = cat.quizzes.find((qq) => qq.slug === slug);
    if (q) return { category: cat.slug, quiz: q } as const;
  }
  return null;
}
