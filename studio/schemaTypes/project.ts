import { defineArrayMember, defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Proyek',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (ID Unik URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      description: 'Contoh: Web App, Fullstack, Backend API, IoT',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Tahun',
      type: 'number',
      initialValue: 2026,
      validation: (rule) => rule.required().integer().min(2018).max(2035),
    }),
    defineField({
      name: 'summary',
      title: 'Ringkasan Proyek',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: 'coverImage',
      title: 'Gambar Cover (Opsional)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Teks Alternatif (Alt)',
          type: 'string',
          description: 'Deskripsi singkat gambar untuk aksesibilitas',
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tech Stack / Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'liveUrl',
      title: 'URL Live Demo (Opsional)',
      type: 'url',
    }),
    defineField({
      name: 'repoUrl',
      title: 'URL Repository GitHub (Opsional)',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Tampilkan di Selected Work (3 Utama)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
      initialValue: 1,
      description: 'Angka lebih kecil tampil lebih dulu (1, 2, 3, ...)',
    }),
  ],
  orderings: [
    {
      title: 'Urutan Tampil',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'year', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      year: 'year',
      media: 'coverImage',
    },
    prepare({ title, category, year, media }) {
      return {
        title: title || 'Untitled Project',
        subtitle: [category, year].filter(Boolean).join(' · '),
        media,
      };
    },
  },
});
