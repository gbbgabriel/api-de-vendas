interface ImailConfig {
  driver: 'ethereal' | 'ses'
  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER,

  defaults: {
    from: {
      email: 'contato@gbbdeveloper.online',
      name: 'Gabriel Botelho',
    },
  },
} as ImailConfig
