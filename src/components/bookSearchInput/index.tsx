"use client"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useCallback, useState } from "react";
import { ActionMeta, GroupBase, OptionProps, SingleValue, SingleValueProps } from "react-select";
import Select from "react-select/async";

type Props = {
  className?: string;
  onSelect?: ((value: SingleValue<Data>, actionMeta: ActionMeta<Data>) => void)
}

export type Data = {
  value: string;
  cover: string;
  title: string;
  authors: Array<string>;
  year: string;
  pageCount: number;
};

export function BookSearchInputComponent({ className, onSelect }: Props) {
  const [currentController, setCurrentController] = useState<AbortController | null>(null);
  
  const promiseOptions = useCallback((value: string) =>
    new Promise<Array<Data>>(async (resolve) => {
      let data: Array<Data> = [];
      try {
        if (currentController) {
          currentController.abort();
        }

        if (!value) {
          return resolve([]);
        }

        const controller = new AbortController();
        const { signal } = controller;

        setCurrentController(controller);

        const result = await fetch(`https://openlibrary.org/search.json?title=${encodeURI(value)}`, { signal }).then((res) => res.json());

        data = (result.docs as Array<{
          key: string
          type: string
          seed: string[]
          title: string
          title_sort: string
          title_suggest: string
          edition_count: number
          edition_key: string[]
          publish_date: string[]
          publish_year: number[]
          first_publish_year: number
          number_of_pages_median: number
          lccn: string[]
          publish_place: string[]
          oclc: string[]
          contributor: string[]
          lcc: string[]
          ddc: string[]
          isbn: string[]
          last_modified_i: number
          ebook_count_i: number
          ebook_access: string
          has_fulltext: boolean
          public_scan_b: boolean
          ia: string[]
          ia_collection: string[]
          ia_collection_s: string
          lending_edition_s: string
          lending_identifier_s: string
          printdisabled_s: string
          ratings_average: number
          ratings_sortable: number
          ratings_count: number
          ratings_count_1: number
          ratings_count_2: number
          ratings_count_3: number
          ratings_count_4: number
          ratings_count_5: number
          readinglog_count: number
          want_to_read_count: number
          currently_reading_count: number
          already_read_count: number
          cover_edition_key: string
          cover_i: number
          first_sentence: string[]
          publisher: string[]
          language: string[]
          author_key: string[]
          author_name: string[]
          author_alternative_name: string[]
          person: string[]
          place: string[]
          subject: string[]
          time: string[]
          id_amazon: string[]
          id_bcid: string[]
          id_dnb: string[]
          id_goodreads: string[]
          id_librarything: string[]
          id_overdrive: string[]
          id_standard_ebooks: string[]
          ia_loaded_id: string[]
          ia_box_id: string[]
          publisher_facet: string[]
          person_key: string[]
          place_key: string[]
          time_facet: string[]
          person_facet: string[]
          subject_facet: string[]
          _version_: number
          place_facet: string[]
          lcc_sort: string
          author_facet: string[]
          subject_key: string[]
          ddc_sort: string
          time_key: string[]
        }>).map((book) => {
          return {
            value: book.key,
            cover: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
            title: book.title,
            authors: book.author_name ?? [],
            year: String(book.first_publish_year ?? ""),
            pageCount: book.number_of_pages_median ?? 0,
          }
        });

        setCurrentController(null);
      } catch (error) {
        currentController?.abort();

        setCurrentController(null);
      } finally {
        resolve(data);
      }
    }), [currentController]);
  

  return (
    <Select
      classNames={{
        container: () => `${className} !rounded-none !border !border-light-gray-100 !border !p-0 !m-0 !text-sm`,
        control: () => "!border-none !p-0 !m-0 !py-[6px] !px-3 !min-h-0 !rounded-none !border-black focus-within:!shadow-[0_0_0_1px_rgb(0,0,0)]",
        placeholder: () => "!text-sm !p-0 !m-0 !text-light-gray-300",
        input: () => "!text-sm !p-0 !m-0",
        valueContainer: () => "!text-sm !p-0 !m-0",
        singleValue: () => "!text-sm !p-0 !m-0",
        menuList: () => "!rounded-none",
      }}
      onBlur={() =>  false}
      placeholder="Pesquisar o livro"
      cacheOptions
      defaultValue={null}
      defaultOptions
      isLoading={!!currentController}
      loadOptions={promiseOptions}
      onChange={onSelect}
      components={{
        Option: ({ innerRef, innerProps, data: book}: OptionProps<Data, false, GroupBase<Data>>) => {
          return (
            <div key={`${book.value}-${crypto.randomUUID()}`} ref={innerRef} {...innerProps} className="flex py-3 mx-3 cursor-pointer border-b border-b-light-gray-100">
              <Image className="aspect-book-cover" src={book.cover} width={50} height={75} alt={`${book.title} capa`}/>
              <div className="w-full h-full flex flex-col ml-2">
                <span className="text-sm line-clamp-2">{book.title}</span>
                <span className="text-xs font-bold text-dark-gray-700">{book.authors.join(", ")}</span>
                <span className="mt-1 text-xs text-dark-gray-700">{book.year}</span>
              </div>
            </div>
          )
        },
        SingleValue: ({ innerProps, data: book}: SingleValueProps<Data, false, GroupBase<Data>>) => {
          return (
            <div className="absolute w-full h-full flex" {...innerProps}>
              <span>{book.title}</span>
            </div>
          )
        },
        IndicatorsContainer: () => <FontAwesomeIcon className="ml-2 text-gray-400" icon={faMagnifyingGlass}/> ,
        ClearIndicator: () => null,
        NoOptionsMessage: () => <div className="w-full flex items-center justify-center"><span className="text-light-gray-500">Não encontramos nada</span></div>,
        LoadingMessage: () => <div className="w-full flex items-center justify-center"><span className="text-light-gray-500">Procurando...</span></div>,
      }}
    />
  )
}