const { v4: uuid } = require('uuid');

const coursesData = [
  {
    authors: ['Bartłomiej Borowczyk'],
    id: uuid(),
    img: 'https://i.pinimg.com/originals/d7/d2/4d/d7d24d1c8998bf1b384684e3b0a0575e.jpg',
    price: 69.99,
    title: 'Projekt',
  },
  {
    authors: ['Bartłomiej Borowczyk'],
    id: uuid(),
    img: 'https://i.imgur.com/5TPCTmf.jpg',
    price: 69.99,
    title: 'Projekt',
  },
  {
    authors: ['Bartłomiej Borowczyk'],
    id: uuid(),
    img: 'https://i.imgur.com/oQHvaVK.jpeg',
    price: 69.99,
    title: 'Projekt',
  },
  {
    authors: ['Bartłomiej Borowczyk', 'Mateusz Domański'],
    id: uuid(),
    img: 'https://inhabitat.com/wp-content/blogs.dir/1/files/2011/04/Mentougou-Eco-Valley-11.jpg',
    price: 69.99,
    title: 'Projekt',
  },
  {
    authors: ['Bartłomiej Borowczyk'],
    id: uuid(),
    img: 'https://cdn.homedit.com/wp-content/uploads/2019/06/Stacked-shipping-container-store.jpg',
    price: 69.99,
    title: 'Projekt',
  },
  {
    authors: ['Bartłomiej Borowczyk'],
    id: uuid(),
    img: 'https://i.pinimg.com/originals/32/3f/0c/323f0ca732cad325a77ca8651846fa9f.jpg',
    price: 69.99,
    title: 'Projekt',
  },
  {
    authors: ['Bartłomiej Borowczyk'],
    id: uuid(),
    img: 'https://www.contemporist.com/wp-content/uploads/2016/09/hot-on-pinterest_180916_01a.jpg',
    price: 69.99,
    title: 'Projekt',
  },
  {
    authors: ['Bartłomiej Borowczyk', 'Mateusz Domański', 'Michał Dziedziński', 'Kacper Sieradziński'],
    id: uuid(),
    img: 'https://images.dwell.com/photos/6553875003604258816/6553889020707618816/large.jpg',
    price: 69.99,
    title: 'Projekt'
  }
];

exports.getCourses = (request, response, next) => {
  try {
    response.status(200).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses',
    });
  }
};

exports.getCourse = (request, response, next) => {
  try {
    const { id } = request.params;
    const courseToSend = coursesData.find(course => course.id === id);

    if (!courseToSend) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }

    response.status(200).json({
      course: courseToSend, 
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses/:id',
    })
  }
};

exports.postCourse = (request, response, next) => {
  try {
    const { authors, img, price, title } = request.body;
    if ( !authors || !price || !title ) {
      response.status(400).json({
        message: 'Nie podano wszystkich wymaganych informacji',
      });

      return;
    }

    const isCourseExist = coursesData.some(({title: currentTitle}) => currentTitle === title);
    if (isCourseExist) {
      response.status(409).json({
        message: `Istnieje już w bazie kurs ${title}`,
      });

      return;
    }

    const newCourse = {
      authors: authors,
      id: uuid(),
      img,
      price,
      title,
    };

    coursesData.push(newCourse);

    response.status(201).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /courses'
    });
  }
};

exports.putCourse = (request, response, next) => {
  try {
    const { authors, id, price, title } = request.body;
    if (!authors || !id || !price || !title) {
      response.status(400).json({
        message: 'Nie podano wszystkich wymaganych informacji',
      });

      return;
    }

    const indexCourseToUpdate = coursesData.findIndex(course => course.id === id);
    if (indexCourseToUpdate === -1) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }
    
    
    coursesData.splice(indexCourseToUpdate, 1, request.body);

    response.status(202).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /courses'
    });
  }
};

exports.deleteCourse = (request, response, next) => {
  try {
    const { id } = request.params;

    console.log(id);
    const indexCourseToDelete = coursesData.findIndex(course => course.id === id);

    if (indexCourseToDelete === -1) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }

    coursesData.splice(indexCourseToDelete, 1);
    response.status(200).end();
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /courses/:id',
    });
  }
};

exports.coursesData = coursesData;